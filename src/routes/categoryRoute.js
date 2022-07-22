const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');

const categoryRoute = Router();

categoryRoute.post('/', authorizeMiddleware.auth, categoryController.create);
categoryRoute.get('/', categoryController.get);

module.exports = categoryRoute;