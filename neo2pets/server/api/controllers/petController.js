const express = require("express");
const joi = require("joi");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { createControllerHandler, checkAuth } = require("./controllerUtil");

const getPetSchema = joi.object().keys({
  userToken: joi.string().required()
});

const createPetSchema = joi.object().keys({
  raceName: joi
    .string()
    .alphanum()
    .required(),
  nickName: joi
    .string()
    .alphanum()
    .required(),
  userToken: joi.string().required()
});

const doesUserHavePetSchema = joi.object().keys({
  userToken: joi.string().required()
});

async function validatedDoesUserHavePetHandler(value, modelMap, res) {
  const { userToken } = value;

  if (!checkAuth(res, userToken, "userToken")) {
    return;
  }

  const { id } = jsonwebtoken.decode(userToken);

  const pet = await modelMap.petModel.findOne({ owner: id });

  res.send({
    status: "SUCCESS",
    hasPet: !pet
  });
}

async function validatedGetPetHandler(value, modelMap, res) {
  const { petID, userToken } = value;

  if (!checkAuth(res, userToken, "userToken")) {
    return;
  }

  const { id } = jsonwebtoken.decode(userToken);

  const pet = await modelMap.petModel.findOne({ owner: id }).populate("race");

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

  const now = Date.now();
  let hunger =
    pet.hunger + Math.abs(now - pet.lastHungerCheck) / (1000 * 1 * 60) * 1;
  hunger = Math.max(0, hunger);
  hunger = Math.min(100, hunger);
  pet.lastHungerCheck = now;
  pet.hunger = hunger;

  let fun = pet.fun + Math.abs(now - pet.lastFunCheck) / (1000 * 1 * 60) * 1;
  fun = Math.max(0, fun);
  fun = Math.min(100, fun);
  pet.lastFunCheck = now;
  pet.fun = fun;

  await pet.save();

  res.send({
    status: "SUCCESS",
    pet: {
      race: {
        id: pet.race.id,
        name: pet.race.name,
        imgPath: pet.race.imgPath
      },
      owner: pet.owner,
      nickName: pet.nickName,
      hunger: pet.hunger,
      fun: pet.fun
    }
  });
}

async function validatedCreatePetHandler(value, modelMap, res) {
  const { raceName, nickName, userToken } = value;

  if (!checkAuth(res, userToken, "userToken")) {
    return;
  }

  const petRace = await modelMap.petRaceModel.findOne({ name: raceName });

  if (!petRace) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: `Race with name "${raceName}" does not exist`,
          field: "raceName"
        }
      ]
    });
  }

  const { id } = jsonwebtoken.decode(userToken);

  const ownedPets = await modelMap.petModel.find({ owner: id });

  if (ownedPets.length >= 1) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "Owner already has an pet",
          field: "userToken"
        }
      ]
    });
  }

  const pet = await modelMap.petModel.create({
    race: petRace._id,
    nickName,
    owner: id
  });

  res.send({
    status: "SUCCESS",
    pet: {
      id: pet._id,
      race: pet.race.name,
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
    createControllerHandler(
      "GET",
      getPetSchema,
      modelMap,
      validatedGetPetHandler
    )
  );

  router.post(
    "/create",
    bodyParser.json(),
    createControllerHandler(
      "POST",
      createPetSchema,
      modelMap,
      validatedCreatePetHandler
    )
  );

  router.get(
    "/haspet",
    createControllerHandler(
      "GET",
      doesUserHavePetSchema,
      modelMap,
      validatedDoesUserHavePetHandler
    )
  );

  return router;
}

module.exports = {
  getPetController
};
