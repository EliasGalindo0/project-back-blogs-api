const { Router } = require('express');
const usersController = require('../controllers/usersController');

const usersRoute = Router();

usersRoute.get('/', usersController.getAll);
usersRoute.get('/:id', usersController.getById);
usersRoute.delete('/me', usersController.remove);
usersRoute.post('/', usersController.create);

module.exports = usersRoute;