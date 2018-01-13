const express = require("express");
const joi = require("joi");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { createControllerHandler, checkAuth } = require("./controllerUtil");

const getMoneyAmountSchema = joi.object().keys({
  userToken: joi.string().required()
});

const increaseMoneyAmountSchema = joi.object().keys({
  userToken: joi.string().required(),
  amount: joi.number().required()
});

async function validateGetMoneyAmountHandler(value, modelMap, res) {
  const { userToken } = value;

  if (!checkAuth(res, userToken, "userToken")) {
    return;
  }

  const { id } = jsonwebtoken.decode(userToken);

  const user = await modelMap.userModel.findById(id);

  res.send({
    status: "SUCCESS",
    money: user.money
  });
}

async function validateIncreaseMoneyAmountHandler(value, modelMap, res) {
  const { userToken, amount } = value;

  if (!checkAuth(res, userToken, "userToken")) {
    return;
  }

  const { id } = jsonwebtoken.decode(userToken);

  const user = await modelMap.userModel.findOneAndUpdate(
    { _id: id },
    { $inc: { money: amount } },
    { new: true }
  );

  res.send({
    status: "SUCCESS",
    money: user.money
  });
}

/**
 * Returns an express router filled with the store routes
 */
function getMoneyController(modelMap) {
  const router = express.Router();

  router.get(
    "/get",
    bodyParser.json(),
    createControllerHandler(
      "GET",
      getMoneyAmountSchema,
      modelMap,
      validateGetMoneyAmountHandler
    )
  );

  router.post(
    "/increase",
    bodyParser.json(),
    createControllerHandler(
      "POST",
      increaseMoneyAmountSchema,
      modelMap,
      validateIncreaseMoneyAmountHandler
    )
  );

  return router;
}

module.exports = {
  getMoneyController
};
