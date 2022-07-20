const { Router } = require('express');
const usersController = require('../controllers/usersController');

const usersRoute = Router();

usersRoute.get('/', usersController.getAll);
usersRoute.post('/', usersController.create);

module.exports = usersRoute;