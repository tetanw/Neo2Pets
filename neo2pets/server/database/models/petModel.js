const mongoose = require('mongoose');

function createModel() {
    const schema = mongoose.Schema({
        type: String,
        nickName: String
    });

    return mongoose.model('Pet', schema);
}

module.exports = {
    createModel
};