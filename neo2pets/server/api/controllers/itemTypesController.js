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

  if (itemType.name !== "FOOD" && itemType.name !== "FUN") {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "Unkown item type"
        }
      ]
    });
  }

  res.send({
    status: "SUCCESS",
    itemType: {
      name: itemType.name,
      property: itemType.property,
      value: itemType.value,
      imgPath: itemType.imgPath
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

  return router;
}

module.exports = {
  getItemTypeController
};
