const express = require('express');
const joi = require('joi');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const { createControllerHandler } = require('./controllerUtil');

const getItemSchema = joi.object().keys({
  itemID: joi.string().alphanum().required()
});

const createItemSchema = joi.object().keys({
  type: joi.string().alphanum().required(),
});

async function validatedGetItemHandler(value, modelMap, res) {

  const { itemID } = value;

  const item = await modelMap.itemModel.findById(itemID);

  if (!item) {
    res.send({
      status: 'FAILED',
      messages: [{
        message: 'Item could not be found',
        field: 'itemID'
      }]
    });
  }

  res.send({
    status: 'SUCCESS',
    item: {
      type: item.type
    }
  });
}

async function validatedCreateItemHandler(value, modelMap, res) {
  const { type } = value;

  const item = await modelMap.itemModel.create({
    type
  });


  res.send({
    status: 'SUCCESS',
    item: {
      id: item._id,
      type: item.type,
    }
  });
}

/**
 * Returns an express router filled with the item routes
 */
function getItemController(modelMap) {
  const router = express.Router();

  router.get('/get', bodyParser.json(), createControllerHandler('GET', getItemSchema, modelMap, validatedGetItemHandler));

  router.post('/create', bodyParser.json(), createControllerHandler('POST', createItemSchema, modelMap, validatedCreateItemHandler));

  return router;
}

module.exports = {
  getItemController
};