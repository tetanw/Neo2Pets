const mongoose = require("mongoose");

function createModel() {
  const schema = mongoose.Schema({
    buyables: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
        price: Number
      }
    ],
    infinite: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  });

  return mongoose.model("Store", schema);
}

module.exports = {
  createModel
};
