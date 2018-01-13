const { getAuthController } = require("./authController");
const { getPetController } = require("./petController");
const { getItemController } = require("./itemController");
const { getItemTypeController } = require("./itemTypesController");
const { getPetRaceController } = require("./petRaceController");
const { getStoreController } = require("./storeController");

function registerRoutes(app, modelMap) {
  app.use("/api/auth", getAuthController(modelMap));
  app.use("/api/pet", getPetController(modelMap));
  app.use("/api/item", getItemController(modelMap));
  app.use("/api/itemtype", getItemTypeController(modelMap));
  app.use("/api/petrace", getPetRaceController(modelMap));
  app.use("/api/store", getStoreController(modelMap));
}

module.exports = {
  registerRoutes
};
