const mongoose = require('mongoose');

function createModel() {
    const schema = mongoose.Schema({
        type: String
    });

    return mongoose.model('Item', schema);
}

module.exports = {
    createModel
};