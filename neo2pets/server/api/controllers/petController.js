const express = require('express');
const joi = require('joi');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const getPetSchema = joi.object().keys({
  petID: joi.string().alphanum().required()
});

const createPetSchema = joi.object().keys({
  type: joi.string().alphanum().required(),
  nickName: joi.string().alphanum().required()
});

/**
 * Returns an express router filled with the pet related routes
 */
function getPetController(modelMap) {
  const router = express.Router();

  router.get('/get', bodyParser.json(), async (req, res) => {
    try {
      const validationResult = joi.validate(req.query, getPetSchema, { abortEarly: false });

      if (validationResult.error === null) {
        const { petID } = validationResult.value;

        const pet = await modelMap.petModel.findById(petID);

        if (!pet) {
          return res.send({
            status: 'FAILED',
            messages: [{
              message: 'Pet could not be found',
              field: 'petID'
            }]
          });
        }

        res.send({
          status: 'SUCCESS',
          pet: {
            id: pet._id,
            type: pet.type,
            nickName: pet.nickName
          }
        });
      } else {

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

  router.post('/create', bodyParser.json(), async (req, res) => {
    try {
      const validationResult = joi.validate(req.body, createPetSchema, { abortEarly: false });

      if (validationResult.error === null) {

        const { type, nickName } = validationResult.value;

        const pet = await modelMap.petModel.create({
          type,
          nickName
        });


        res.send({
          status: 'SUCCESS',
          pet: {
            id: pet._id,
            type: pet.type,
            nickName: pet.nickName
          }
        });
      } else {

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
  getPetController
};