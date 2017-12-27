const joi = require('joi');

function createControllerHandler(mode, schema, modelMap, validatedHandler) {
  return async (req, res) => {
    let input = null;

    if (mode === 'GET') {
      input = req.query;
    } else if (mode === 'POST') {
      input = req.body;
    } else {
      throw new Error(`Unknown mode: ${mode}`);
    }

    try {
      const { value, error } = joi.validate(input, schema, { abortEarly: false });

      if (error === null) {
        await validatedHandler(value, modelMap, res);
      } else {
        // transform the validation messages
        const messages = error.details.map((message) => {
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
  }
}

module.exports = {
  createControllerHandler
};