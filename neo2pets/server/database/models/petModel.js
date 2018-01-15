const mongoose = require("mongoose");

function createModel() {
  const schema = mongoose.Schema({
    nickName: String,
    hunger: { type: Number, default: 0 },
    fun: { type: Number, default: 0 },
    lastFunCheck: { type: Date, default: Date.now() },
    lastHungerCheck: { type: Date, default: Date.now() },
    race: { type: mongoose.Schema.Types.ObjectId, ref: "PetRace" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  });

  return mongoose.model("Pet", schema);
}

module.exports = {
  createModel
};
