const express = require("express");
const joi = require("joi");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { createControllerHandler, checkAuth } = require("./controllerUtil");

const addItemToStoreSchema = joi.object().keys({
  userToken: joi.string().required(),
  itemID: joi
    .string()
    .alphanum()
    .required(),
  price: joi.number().required()
});

const listBuyablesSchema = joi.object().keys({
  storeID: joi
    .string()
    .alphanum()
    .required(),
  userToken: joi.string().required()
});

const buyItemSchema = joi.object().keys({
  userToken: joi.string().required(),
  buyableID: joi
    .string()
    .alphanum()
    .required(),
  storeID: joi
    .string()
    .alphanum()
    .required()
});

const getStoreIDFromUserSchema = joi.object().keys({
  userToken: joi.string().required()
});

const listStoresSchema = joi.object().keys({
  userToken: joi.string().required()
});

async function validatedListStoresHandler(value, modelMap, res) {
  const { userToken } = value;

  if (!checkAuth(res, userToken, "userToken")) {
    return;
  }

  const stores = (await modelMap.storeModel.find({}).populate("owner")).map(
    oldStore => {
      const nrItems = oldStore.buyables.length;
      const totalValue = oldStore.buyables.reduce((total, item) => {
        return total + item.price;
      }, 0);

      return {
        id: oldStore.id,
        ownerName: oldStore.owner.username,
        infinite: oldStore.infinite,
        nrItems,
        totalValue
      };
    }
  );

  res.send({
    status: "SUCCESS",
    stores
  });
}

async function validatedGetStoreIDFromUserHandler(value, modelMap, res) {
  const { userToken } = value;

  if (!checkAuth(res, userToken, "userToken")) {
    return;
  }

  const { id } = jsonwebtoken.decode(userToken);

  const store = await modelMap.storeModel.findOne({ owner: id });
  if (!store) {
    return res.send({
      status: "FAILED",
      messages: [
        { message: "Store does not exist for user", field: "userToken" }
      ]
    });
  }

  res.send({
    status: "SUCCESS",
    storeID: store.id
  });
}

async function validateListBuyablesHandler(value, modelMap, res) {
  const { userToken, storeID } = value;

  if (!checkAuth(res, userToken, "userToken")) {
    return;
  }

  const { id } = jsonwebtoken.decode(userToken);

  const store = await modelMap.storeModel
    .findOne({ _id: storeID })
    .populate("owner");
  if (!store) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "Store does not exist",
          field: "userToken"
        }
      ]
    });
  }

  const buyables = await Promise.all(
    store.buyables.map(async oldBuyable => {
      const {
        id: newItemID,
        type: newItemType
      } = await modelMap.itemModel.findById(oldBuyable.item);

      const {
        name,
        _id: id,
        propertyData,
        properties
      } = await modelMap.itemTypeModel.findById(newItemType);

      return {
        id: oldBuyable.id,
        item: {
          id: newItemID,
          type: {
            name,
            id,
            propertyData,
            propertyData
          }
        },
        price: oldBuyable.price
      };
    })
  );

  res.send({
    status: "SUCCESS",
    store: {
      id: store.id,
      ownStore: store.owner.id === id,
      ownerName: store.owner.username,
      infinite: store.infinite,
      buyables
    }
  });
}

async function validatedBuyItemHandler(value, modelMap, res) {
  const { buyableID, userToken, storeID } = value;

  // check whether authenticated
  if (!checkAuth(res, userToken, "userToken")) {
    return;
  }

  const { id } = jsonwebtoken.decode(userToken);

  const store = await modelMap.storeModel
    .findOne({ _id: storeID })
    .populate("owner");

  if (!store) {
    return res.send({
      status: "FAILED",
      messages: [{ message: "Store does not exist", field: "storeID" }]
    });
  }

  // if (store.owner.id.toString() === id) {
  //   return res.send({
  //     status: "FAILED",
  //     messages: [
  //       { message: "You can not buy your own items", field: "userToken" }
  //     ]
  //   });
  // }

  const user = await modelMap.userModel.findOne({ _id: id });
  const buyables = store.buyables.filter(buyable => buyable.id === buyableID);
  if (buyables.length === 0) {
    return res.send({
      status: "FAILED",
      messages: [{ message: "Buyable does not exist", field: "buyableID" }]
    });
  }

  const buyable = buyables[0];
  if (user.money < buyable.price) {
    return res.send({
      status: "FAILED",
      messages: [
        { message: "Buyable is too expensive too purchase", field: "buyableID" }
      ]
    });
  }

  // subtract the money from the sender
  user.money -= buyable.price;
  await user.save();

  // remove the buyable from the store
  store.buyables = store.buyables.filter(buyable => buyable.id !== buyableID);
  await store.save();

  // add the money to the store owner
  const owner = await modelMap.userModel.findById(store.owner.id.toString());
  owner.money += buyable.price;
  await owner.save();

  // set the sender as owner, aka adding it to his inventory
  const found = await modelMap.itemModel.findOneAndUpdate(
    { _id: buyable.item },
    { owner: id }
  );

  res.send({
    status: "SUCCESS"
  });
}

async function validatedAddItemToStoreHandler(value, modelMap, res) {
  const { itemID, userToken, price } = value;

  // check whether authenticated
  if (!checkAuth(res, userToken, "userToken")) {
    return;
  }

  const { id } = jsonwebtoken.decode(userToken);

  let store = await modelMap.storeModel.findOne({ owner: id });
  if (!store) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "Store does not exist",
          field: "storeID"
        }
      ]
    });
  }

  if (store.owner.toString() !== id) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "You are not the owner of the store",
          field: "userToken"
        }
      ]
    });
  }

  if (store.infinite) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "You can not add items to a store with infinite items",
          field: "userToken"
        }
      ]
    });
  }

  const item = await modelMap.itemModel.findOneAndUpdate(
    { _id: itemID, owner: id },
    { owner: null }
  );
  if (!item) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "Item is not owned by user or does not exist",
          field: "itemID"
        }
      ]
    });
  }

  store.buyables.push({
    item: itemID,
    price
  });

  await store.save();

  res.send({
    status: "SUCCESS"
  });
}

/**
 * Returns an express router filled with the store routes
 */
function getStoreController(modelMap) {
  const router = express.Router();

  router.post(
    "/additemtostore",
    bodyParser.json(),
    createControllerHandler(
      "POST",
      addItemToStoreSchema,
      modelMap,
      validatedAddItemToStoreHandler
    )
  );

  router.post(
    "/buyitem",
    bodyParser.json(),
    createControllerHandler(
      "POST",
      buyItemSchema,
      modelMap,
      validatedBuyItemHandler
    )
  );

  router.get(
    "/listbuyables",
    bodyParser.json(),
    createControllerHandler(
      "GET",
      listBuyablesSchema,
      modelMap,
      validateListBuyablesHandler
    )
  );

  router.get(
    "/getstoreidfromuser",
    createControllerHandler(
      "GET",
      getStoreIDFromUserSchema,
      modelMap,
      validatedGetStoreIDFromUserHandler
    )
  );

  router.get(
    "/liststores",
    createControllerHandler(
      "GET",
      listStoresSchema,
      modelMap,
      validatedListStoresHandler
    )
  );

  return router;
}

module.exports = {
  getStoreController
};
