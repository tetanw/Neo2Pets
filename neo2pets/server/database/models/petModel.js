const mongoose = require("mongoose");

function createModel() {
  const schema = mongoose.Schema({
    nickName: String,
    race: { type: mongoose.Schema.Types.ObjectId, ref: "PetRace" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  });

  return mongoose.model("Pet", schema);
}

module.exports = {
  createModel
};
