const { Router } = require('express');
const usersController = require('../controllers/usersController');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');

const usersRoute = Router();

usersRoute.delete('/me', authorizeMiddleware.auth, usersController.remove);
usersRoute.get('/:id', authorizeMiddleware.auth, usersController.getById);
usersRoute.get('/', authorizeMiddleware.auth, usersController.getAll);
usersRoute.post('/', usersController.create);

module.exports = usersRoute;