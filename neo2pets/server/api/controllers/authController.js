const express = require('express');
const joi = require('joi');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

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
function getAuthController(modelMap) {
  const router = express.Router();

  router.post('/login', bodyParser.json(), async (req, res) => {
    try {
      const validationResult = joi.validate(req.body, loginSchema, { abortEarly: false });

      if (validationResult.error === null) {
        console.log('Valid Register');

        const { password, username } = validationResult.value;

        // get the user and if no user found than it failed
        const user = await modelMap.userModel.findOne({ username });
        if (!user) {
          return res.send({
            status: 'FAILED',
            messages: [{
              message: 'Username is incorrect',
              field: 'username'
            }]
          });
        }

        // check whether the password is correct
        if (!await bcryptjs.compare(password, user.password)) {
          return res.send({
            status: 'FAILED',
            messages: [{
              message: 'Password is incorrect',
              field: 'password'
            }]
          });
        }

        res.send({
          status: 'SUCCESS',
          token: jsonwebtoken.sign({ username }, process.env.WEBTOKEN_SECRET)
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

  router.post('/register', bodyParser.json(), async (req, res) => {
    try {
      const validationResult = joi.validate(req.body, registerSchema, { abortEarly: false });

      if (validationResult.error === null) {
        console.log('Valid Login');

        const { username, password, email } = validationResult.value;

        // check whether the username and the email is already taken
        if (await modelMap.userModel.findOne({
          username
        }) !== null) {
          return res.send({
            status: 'FAILED',
            messages: [{
              message: 'Username was already taken',
              field: 'username'
            }]
          });
        };

        if (await modelMap.userModel.findOne({
          email
        }) !== null) {
          return res.send({
            status: 'FAILED',
            messages: [{
              message: 'Email was already taken',
              field: 'email'
            }]
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
          status: 'SUCCESS'
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