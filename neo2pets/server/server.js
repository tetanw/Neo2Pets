// Loads the .env file in the process.env variable, so that
// the environment variables are set
require('dotenv').config();

const database = require('./database/database');

const { registerRoutes } = require('./api/controllers/mainController');

// imports
const express = require('express');

const app = express();

database.createDatabase()
    .then((modelMap) => {
        // register all of the api routes
        registerRoutes(app, modelMap);

        // port defaults to 3000 if no PORT set in env
        const port = 3000 | process.env.PORT;
        app.listen(port, () => {
            console.log(`Server listening at: ${port}`);
        });
    });

