const express = require("express");
const joi = require("joi");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { createControllerHandler } = require("./controllerUtil");

const getPetRaceSchema = joi.object().keys({
  name: joi
    .string()
    .alphanum()
    .required()
});

const createPetRaceSchema = joi.object().keys({
  name: joi
    .string()
    .alphanum()
    .required(),
  imgPath: joi.string().required()
});

async function validatedGetPetRaceHandler(value, modelMap, res) {
  const { name } = value;

  const petRace = await modelMap.petRaceModel.findOne({ name });

  if (!petRace) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: `PetRace with name "${name}" could not be found`,
          field: "name"
        }
      ]
    });
  }

  res.send({
    status: "SUCCESS",
    petRace: {
      name: petRace.name,
      imgPath: petRace.imgPath
    }
  });
}

async function validatedCreatePetRaceHandler(value, modelMap, res) {
  const { name, imgPath } = value;

  const petRace = await modelMap.petRaceModel.findOne({ name: name });

  if (petRace) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: `The race with the name ${name} already exists`,
          field: "name"
        }
      ]
    });
  }

  const databasePetRace = await modelMap.petRaceModel.create({
    name,
    imgPath
  });

  res.send({
    status: "SUCCESS",
    petRace: {
      id: databasePetRace._id,
      name: databasePetRace.name,
      imgPath: databasePetRace.imgPath
    }
  });
}

/**
 * Returns an express router filled with the item type routes
 */
function getPetRaceController(modelMap) {
  const router = express.Router();

  router.get(
    "/get",
    createControllerHandler(
      "GET",
      getPetRaceSchema,
      modelMap,
      validatedGetPetRaceHandler
    )
  );

  router.post(
    "/create",
    bodyParser.json(),
    createControllerHandler(
      "POST",
      createPetRaceSchema,
      modelMap,
      validatedCreatePetRaceHandler
    )
  );

  return router;
}

module.exports = {
  getPetRaceController
};
