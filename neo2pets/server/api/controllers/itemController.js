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
    .required()
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
  const { typeName } = value;

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

  const item = await modelMap.itemModel.create({
    type: itemType._id
  });

  res.send({
    status: "SUCCESS",
    item: {
      id: item._id,
      type: itemType.name
    }
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
