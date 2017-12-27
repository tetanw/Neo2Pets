var mongoose = require('mongoose');

function createDatabase() {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise
        mongoose.connect('mongodb://webtech:123@ds133017.mlab.com:33017/dev-webtech', {
            useMongoClient: true
        });

        mongoose.connection.once('open', () => {
            const modelMap = {
                userModel: require('./models/userModel').createModel(),
                petModel: require('./models/petModel').createModel()
            }

            resolve(modelMap);
        });
    
        mongoose.connection.once('error', () => {
            console.error('Database could not create connection!');
            process.exit(0);
        });
    });
}

module.exports = {
    createDatabase
};