const express = require('express');
const joi = require('joi');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');

const loginSchema = joi.object().keys({
  username: joi.string().alphanum().required(),
  password: joi.string().alphanum().required()
});

const registerSchema = joi.object().keys({
  username: joi.string().alphanum().min(5).max(20).required(),
  password: joi.string().alphanum().min(5).max(40).required(),
  email: joi.string().email().required()
})

/**
 * Returns an express router filled with the authentication routes
 */
function getAuthController() {
  const router = express.Router();

  router.post('/login', bodyParser.json(), (req, res) => {
    try {
      const validationResult = joi.validate(req.body, loginSchema, { abortEarly: false });

      if (validationResult.error === null) {
        console.log('Valid Register');

        res.send({
          status: 'SUCCES'
        });
      } else {
        console.log('Invalid Register');

        // transform the validation messages
        const messages = validationResult.error.details.map((message) => {
          return {
            message: message.message,
            field: message.context.key
          };
        });

        res.send({
          status: 'FAILED',
          messages
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: 'FAILED'
      });
    }
  });

  router.post('/register', bodyParser.json(), (req, res) => {
    try {
      const validationResult = joi.validate(req.body, registerSchema, { abortEarly: false });

      if (validationResult.error === null) {
        console.log('Valid Login');
        res.send({
          status: 'SUCCES'
        });
      } else {
        console.log('Invalid login');

        // transform the validation messages
        const messages = validationResult.error.details.map((message) => {
          return {
            message: message.message,
            field: message.context.key
          };
        });

        res.send({
          status: 'FAILED',
          messages
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: 'FAILED'
      });
    }
  });

  return router;
}

module.exports = {
  getAuthController
};