const mongoose = require("mongoose");

function createModel() {
  const schema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    money: { type: Number, default: 0 }
  });

  return mongoose.model("User", schema);
}

module.exports = {
  createModel
};
