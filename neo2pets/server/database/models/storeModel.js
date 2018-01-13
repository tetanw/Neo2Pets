const mongoose = require("mongoose");

function createModel() {
  const schema = mongoose.Schema({
    buyables: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
        price: Number
      }
    ],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  });

  return mongoose.model("Store", schema);
}

module.exports = {
  createModel
};
