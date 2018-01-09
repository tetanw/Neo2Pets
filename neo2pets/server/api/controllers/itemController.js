const express = require("express");
const joi = require("joi");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { createControllerHandler } = require("./controllerUtil");

const getItemSchema = joi.object().keys({
  itemID: joi
    .string()
    .alphanum()
    .required()
});

const createItemSchema = joi.object().keys({
  typeName: joi
    .string()
    .alphanum()
    .required(),
  userToken: joi.string().required()
});

const getOwnedItemsSchema = joi.object().keys({
  userToken: joi.string().required()
});

async function validatedGetItemHandler(value, modelMap, res) {
  const { itemID } = value;

  const item = await modelMap.itemModel.findById(itemID).populate("type");

  if (!item) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "Item could not be found",
          field: "itemID"
        }
      ]
    });
  }

  res.send({
    status: "SUCCESS",
    item: {
      type: item.type.name,
      properties: item.type.properties,
      propertyData: item.type.propertyData
    }
  });
}

async function validatedCreateItemHandler(value, modelMap, res) {

  const { typeName, userToken } = value;

  if (!jsonwebtoken.verify(userToken, process.env.WEBTOKEN_SECRET)) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "You should be authenticated to do this request",
          field: "userToken"
        }
      ]
    });
  }

  const itemType = await modelMap.itemTypeModel.findOne({ name: typeName });

  if (!itemType) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: `The type with the name ${typeName} does not exist`,
          field: "typeName"
        }
      ]
    });
  }

  const { id } = jsonwebtoken.decode(userToken);

  const item = await modelMap.itemModel.create({
    type: itemType._id,
    owner: id
  });

  res.send({
    status: "SUCCESS",
    item: {
      id: item._id,
      type: itemType.name,
      ownerID: id
    }
  });
}

async function validatedGetOwnedItemsHandler(value, modelMap, res, user) {
  const { userToken } = value;

  if (!jsonwebtoken.verify(userToken, process.env.WEBTOKEN_SECRET)) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "You should be authenticated to do this request",
          field: "userToken"
        }
      ]
    });
  }

  const { id } = jsonwebtoken.decode(userToken);

  const items = (await modelMap.itemModel.find({ owner: id }).populate("type")).map((oldItem) => {
    return {
      id: oldItem._id,
      type: {
        id: oldItem.type.id,
        name: oldItem.type.name,
        propertyData: oldItem.type.propertyData,
        properties: oldItem.type.properties
      }
    }
  })

  res.send({
    status: "SUCCESS",
    id: id,
    items
  });
}

/**
 * Returns an express router filled with the item routes
 */
function getItemController(modelMap) {
  const router = express.Router();

  router.get(
    "/get",
    createControllerHandler(
      "GET",
      getItemSchema,
      modelMap,
      validatedGetItemHandler
    )
  );

  router.get(
    "/getowneditems",
    createControllerHandler(
      "GET",
      getOwnedItemsSchema,
      modelMap,
      validatedGetOwnedItemsHandler
    )
  );

  router.post(
    "/create",
    bodyParser.json(),
    createControllerHandler(
      "POST",
      createItemSchema,
      modelMap,
      validatedCreateItemHandler
    )
  );

  return router;
}

module.exports = {
  getItemController
};
