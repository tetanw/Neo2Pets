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
    oldStore => ({
      ownerName: oldStore.owner.username
    })
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
    .populate("owner")
    .populate({
      path: "buyables",
      populate: {
        path: "item",
        model: "Item"
      }
    });
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

  const buyables = store.buyables.map(({ item, price, _id }) => ({
    id: _id,
    item,
    price
  }));

  res.send({
    status: "SUCCESS",
    buyables
  });
}

async function validatedBuyItemHandler(value, modelMap, res) {
  const { buyableID, userToken, storeID } = value;

  // check whether authenticated
  if (!checkAuth(res, userToken, "userToken")) {
    return;
  }

  const { id } = jsonwebtoken.decode(userToken);

  const store = await modelMap.storeModel.findOne({ _id: storeID });
  if (!store) {
    return res.send({
      status: "FAILED",
      messages: [{ message: "Store does not exist", field: "storeID" }]
    });
  }

  const user = await modelMap.userModel.findOne({ _id: id });
  const buyables = store.buyables.filter(buyable => buyable.id === buyableID);
  if (buyables.length !== 1) {
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
  user.money -= buyable.price;
  user.save();

  store.buyables = store.buyables.filter(buyable => buyable.id !== buyableID);
  store.save();

  res.send({
    status: "SUCCESS"
  });
}

async function validatedAddItemToStoreHandler(value, modelMap, res) {
  const { itemID, userToken, price, storeID } = value;

  // check whether authenticated
  if (!checkAuth(res, userToken, "userToken")) {
    return;
  }

  const { id } = jsonwebtoken.decode(userToken);

  let store = await modelMap.storeModel.findOne({ _id: storeID });
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
