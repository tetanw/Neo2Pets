const mongoose = require("mongoose");

function createModel() {
  const schema = mongoose.Schema({
    name: String,
    imgPath: { type: String, default: "" }
  });

  return mongoose.model("PetRace", schema);
}

module.exports = {
  createModel
};
