const { getAuthController } = require("./authController");
const { getPetController } = require("./petController");
const { getItemController } = require("./itemController");
const { getStoreController } = require("./storeController");
const { getMoneyController } = require("./moneyController");

function registerRoutes(app, modelMap) {
  app.use("/api/auth", getAuthController(modelMap));
  app.use("/api/pet", getPetController(modelMap));
  app.use("/api/item", getItemController(modelMap));
  app.use("/api/store", getStoreController(modelMap));
  app.use("/api/money", getMoneyController(modelMap));
}

module.exports = {
  registerRoutes
};
