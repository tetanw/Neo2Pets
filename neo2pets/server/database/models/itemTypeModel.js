const mongoose = require("mongoose");

function createModel() {
  const schema = mongoose.Schema({
    name: String,
    imgPath: { type: String, default: "" },
    property: { type: String, default: "" },
    value: { type: Number, default: 0 }
  });

  return mongoose.model("ItemType", schema);
}

module.exports = {
  createModel
};
