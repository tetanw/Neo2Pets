const mongoose = require("mongoose");

function createModel() {
  const schema = mongoose.Schema({
    type: { type: mongoose.Schema.Types.ObjectId, ref: "ItemType" }
  });

  return mongoose.model("Item", schema);
}

module.exports = {
  createModel
};
