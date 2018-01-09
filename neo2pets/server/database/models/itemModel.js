const mongoose = require("mongoose");

function createModel() {
  const schema = mongoose.Schema({
    type: { type: mongoose.Schema.Types.ObjectId, ref: "ItemType" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  });

  return mongoose.model("Item", schema);
}

module.exports = {
  createModel
};
