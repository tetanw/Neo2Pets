// Loads the .env file in the process.env variable, so that
// the environment variables are set
require('dotenv').config();

const authController = require('./api/controllers/authController');

// imports
const express = require('express');

const app = express();

app.use('/api/auth', authController.getAuthController());

// port defaults to 3000 if no PORT set in env
const port = 3000 | process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening at: ${port}`);
});