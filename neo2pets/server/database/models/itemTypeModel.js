const mongoose = require("mongoose");

function createModel() {
  const schema = mongoose.Schema({
    name: String,
    properties: [String],
    propertyData: {
      TOY: {
        funValue: Number
      }
    }
  });

  return mongoose.model("ItemType", schema);
}

module.exports = {
  createModel
};
