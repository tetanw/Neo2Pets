const express = require("express");
const joi = require("joi");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { createControllerHandler } = require("./controllerUtil");

const getItemTypeByNameSchema = joi.object().keys({
  name: joi
    .string()
    .alphanum()
    .required()
});

const createItemTypeSchema = joi.object().keys({
  name: joi
    .string()
    .alphanum()
    .required(),
  properties: joi.array().items(joi.string()).required(),
  propertyData: {
    TOY: joi.object({
        funValue: joi.number().required()
    })
  }
});

async function validatedGetItemTypeByNameHandler(value, modelMap, res) {
  const { name } = value;

  const itemType = await modelMap.itemTypeModel.findOne({ name });

  if (!itemType) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: `ItemType with name "${name}" could not be found`,
          field: "name"
        }
      ]
    });
  }

  res.send({
    status: "SUCCESS",
    itemType: {
      name: itemType.name,
      properties: itemType.properties,
      propertyData: itemType.propertyData
    }
  });
}

async function validatedCreateItemTypeHandler(value, modelMap, res) {
  const { name, properties, propertyData: { TOY } } = value;

  const itemType = await modelMap.itemTypeModel.findOne({ name: name });

  if (itemType) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: `The type with the name ${name} already exists`,
          field: "typeName"
        }
      ]
    });
  }

  const item = await modelMap.itemTypeModel.create({
    name,
    properties,
    propertyData: {
        TOY
    }
  });

  res.send({
    status: "SUCCESS",
    itemType: {
      id: item._id,
      type: item.name,
      properties: properties,
      propertyData: {
          TOY
      }
    }
  });
}

/**
 * Returns an express router filled with the item type routes
 */
function getItemTypeController(modelMap) {
  const router = express.Router();

  router.get(
    "/get",
    createControllerHandler(
      "GET",
      getItemTypeByNameSchema,
      modelMap,
      validatedGetItemTypeByNameHandler
    )
  );

  router.post(
    "/create",
    bodyParser.json(),
    createControllerHandler(
      "POST",
      createItemTypeSchema,
      modelMap,
      validatedCreateItemTypeHandler
    )
  );

  return router;
}

module.exports = {
  getItemTypeController
};
