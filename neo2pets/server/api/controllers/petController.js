const express = require("express");
const joi = require("joi");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { createControllerHandler } = require("./controllerUtil");

const getPetSchema = joi.object().keys({
  petID: joi
    .string()
    .alphanum()
    .required()
});

const createPetSchema = joi.object().keys({
  type: joi
    .string()
    .alphanum()
    .required(),
  nickName: joi
    .string()
    .alphanum()
    .required()
});

async function validatedGetItemHandler(value, modelMap, res) {
  const { petID } = value;

  const pet = await modelMap.petModel.findById(petID);

  if (!pet) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "Pet could not be found",
          field: "petID"
        }
      ]
    });
  }

  res.send({
    status: "SUCCESS",
    pet: {
      id: pet._id,
      type: pet.type,
      nickName: pet.nickName
    }
  });
}

async function validatedCreateItemHandler(value, modelMap, res) {
  const { type, nickName } = value;

  const pet = await modelMap.petModel.create({
    type,
    nickName
  });

  res.send({
    status: "SUCCESS",
    pet: {
      id: pet._id,
      type: pet.type,
      nickName: pet.nickName
    }
  });
}

/**
 * Returns an express router filled with the pet related routes
 */
function getPetController(modelMap) {
  const router = express.Router();

  router.get(
    "/get",
    bodyParser.json(),
    createControllerHandler(
      "GET",
      getPetSchema,
      modelMap,
      validatedGetItemHandler
    )
  );

  router.post(
    "/create",
    bodyParser.json(),
    createControllerHandler(
      "POST",
      createPetSchema,
      modelMap,
      validatedCreateItemHandler
    )
  );

  return router;
}

module.exports = {
  getPetController
};
