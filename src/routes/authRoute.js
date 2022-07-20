const { Router } = require('express');
const authController = require('../controllers/authController');

const authRoute = Router();

authRoute.post('/', authController.auth);

module.exports = authRoute;