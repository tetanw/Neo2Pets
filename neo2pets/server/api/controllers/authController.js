const express = require("express");
const joi = require("joi");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const { createControllerHandler } = require("./controllerUtil");

const loginSchema = joi.object().keys({
  username: joi
    .string()
    .alphanum()
    .required(),
  password: joi
    .string()
    .alphanum()
    .required()
});

const registerSchema = joi.object().keys({
  username: joi
    .string()
    .alphanum()
    .min(5)
    .max(20)
    .required(),
  password: joi
    .string()
    .alphanum()
    .min(5)
    .max(40)
    .required(),
  email: joi
    .string()
    .email()
    .required()
});

const validateTokenSchema = joi.object().keys({
  userToken: joi.string().required()
});

async function validatedLoginHandler(value, modelMap, res) {
  const { password, username } = value;

  // get the user and if no user found than it failed
  const user = await modelMap.userModel.findOne({ username });
  if (!user) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "Username is incorrect",
          field: "username"
        }
      ]
    });
  }

  // check whether the password is correct
  if (!await bcryptjs.compare(password, user.password)) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "Password is incorrect",
          field: "password"
        }
      ]
    });
  }

  res.send({
    status: "SUCCESS",
    token: jsonwebtoken.sign(
      { username, id: user._id },
      process.env.WEBTOKEN_SECRET
    )
  });
}

async function validatedValidateTokenHandler(value, modelMap, res) {
  const { userToken } = value;

  const isValid = !jsonwebtoken.verify(userToken, process.env.WEBTOKEN_SECRET);

  res.send({
    status: isValid ? "SUCCESS" : "FAILED"
  });
}

async function validatedRegisterHandler(value, modelMap, res) {
  const { username, password, email } = value;

  // check whether the username and the email is already taken
  if (
    (await modelMap.userModel.findOne({
      username
    })) !== null
  ) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "Username was already taken",
          field: "username"
        }
      ]
    });
  }

  if (
    (await modelMap.userModel.findOne({
      email
    })) !== null
  ) {
    return res.send({
      status: "FAILED",
      messages: [
        {
          message: "Email was already taken",
          field: "email"
        }
      ]
    });
  }

  // generate the password and store in the database
  const hashesPassword = await bcryptjs.hash(password, 12);
  await modelMap.userModel.create({
    username: username,
    password: hashesPassword,
    email: email
  });

  res.send({
    status: "SUCCESS"
  });
}

/**
 * Returns an express router filled with the authentication routes
 */
function getAuthController(modelMap) {
  const router = express.Router();

  router.post(
    "/login",
    bodyParser.json(),
    createControllerHandler(
      "POST",
      loginSchema,
      modelMap,
      validatedLoginHandler
    )
  );

  router.get(
    "/validate",
    bodyParser.json(),
    createControllerHandler(
      "GET",
      validateTokenSchema,
      modelMap,
      validatedValidateTokenHandler
    )
  );

  router.post(
    "/register",
    bodyParser.json(),
    createControllerHandler(
      "POST",
      registerSchema,
      modelMap,
      validatedRegisterHandler
    )
  );

  return router;
}

module.exports = {
  getAuthController
};
