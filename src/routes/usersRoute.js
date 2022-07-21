const { Router } = require('express');
const usersController = require('../controllers/usersController');
// const authorizeMiddleware = require('../middlewares/authorizeMiddleware');

const usersRoute = Router();

usersRoute.delete('/me', usersController.remove);
usersRoute.get('/:id', usersController.getById);
usersRoute.get('/', usersController.getAll);
usersRoute.post('/', usersController.create);

module.exports = usersRoute;