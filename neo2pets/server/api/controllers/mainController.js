
const { getAuthController } = require('./authController');
const { getPetController } = require('./petController');

function registerRoutes(app, modelMap) {
    app.use('/api/auth', getAuthController(modelMap));
    app.use('/api/pet', getPetController(modelMap));
}

module.exports = {
    registerRoutes
};