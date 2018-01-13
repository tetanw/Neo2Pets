const mongoose = require("mongoose");

function createModel() {
  const schema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    money: Number
  });

  return mongoose.model("User", schema);
}

module.exports = {
  createModel
};
