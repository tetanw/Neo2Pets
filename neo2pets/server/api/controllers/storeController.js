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

async function validatedAddItemToStoreHandler(value, modelMap, res) {
  const { itemID, userToken, price } = value;

  // check whether authenticated
  if (!checkAuth(res, userToken, "userToken")) {
    return;
  }

  const { id } = jsonwebtoken.decode(userToken);

  let store = await modelMap.storeModel.findOne({ owner: id });
  if (!store) {
    store = await modelMap.storeModel.create({
      buyables: [],
      owner: id
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

  return router;
}

module.exports = {
  getStoreController
};
