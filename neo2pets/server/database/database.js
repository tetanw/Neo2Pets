var mongoose = require("mongoose");

const config = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  reconnectTries: 3600,
  reconnectInterval: 2000,
  useMongoClient: true,
};

function createDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      "mongodb://webtech:123@ds133017.mlab.com:33017/dev-webtech",
      config
    );

    mongoose.connection.once("open", () => {
      const modelMap = {
        userModel: require("./models/userModel").createModel(),
        petModel: require("./models/petModel").createModel(),
        itemModel: require("./models/itemModel").createModel(),
        itemTypeModel: require("./models/itemTypeModel").createModel(),
        petRaceModel: require("./models/petRaceModel").createModel(),
        storeModel: require("./models/storeModel").createModel()
      };

      resolve(modelMap);
    });

    mongoose.connection.once("error", () => {
      console.error("Database could not create connection!");
      process.exit(0);
    });
  });
}

module.exports = {
  createDatabase
};
