const joi = require("joi");
const jsonwebtoken = require("jsonwebtoken");

function createControllerHandler(mode, schema, modelMap, validatedHandler) {
  return async (req, res) => {
    // the mode determines where to get the input from
    let input = null;
    if (mode === "GET") {
      input = req.query;
    } else if (mode === "POST") {
      input = req.body;
    } else {
      throw new Error(`Unknown mode: ${mode}`);
    }

    try {
      const { value, error } = joi.validate(input, schema, {
        abortEarly: false
      });

      if (error === null) {
        await validatedHandler(value, modelMap, res);
      } else {
        // transform the validation messages
        const messages = error.details.map(message => {
          return {
            message: message.message,
            field: message.context.key
          };
        });

        res.send({
          status: "FAILED",
          messages
        });
      }
    } catch (error) {
      // unexpected error, so quit with 500
      console.error(error);
      res.status(500).send({
        status: "FAILED"
      });
    }
  };
}

/**
 * Checks whether the user token is valid
 *
 * @param {*} res
 * @param {string} The token to be validated
 * @param {string} fieldName The name of the userTokenField
 */
function checkAuth(res, userToken, fieldName) {
  if (!jsonwebtoken.verify(userToken, process.env.WEBTOKEN_SECRET)) {
    res.send({
      status: "FAILED",
      messages: [
        {
          message: "You should be authenticated to do this request",
          field: fieldName
        }
      ]
    });

    return false;
  }
  return true;
}

module.exports = {
  createControllerHandler,
  checkAuth
};
