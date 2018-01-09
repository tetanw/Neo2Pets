const mongoose = require("mongoose");

function createModel() {
  const schema = mongoose.Schema({
    name: String,
  });

  return mongoose.model("PetRace", schema);
}

module.exports = {
  createModel
};
