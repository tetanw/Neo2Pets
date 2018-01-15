// Loads the .env file in the process.env variable, so that
// the environment variables are set
require("dotenv").config();

const database = require("./database/database");

const { registerRoutes } = require("./api/controllers/mainController");

// imports
const express = require("express");
const path = require("path");

const app = express();

database.createDatabase().then(modelMap => {
  // register all of the api routes
  registerRoutes(app, modelMap);

  // host all of the images
  app.use("/images", express.static(path.resolve("public/images")));

  // Serve static assets
  app.use(express.static(path.resolve(__dirname, "..", "build")));

  // port defaults to 3000 if wno PORT set in env
  const port = 3001 | process.env.PORT;
  app.listen(port, () => {
    console.log(`Server listening at: ${port}`);
  });
});
