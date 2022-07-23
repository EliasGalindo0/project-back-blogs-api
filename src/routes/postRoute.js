const { Router } = require('express');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const postController = require('../controllers/postController');

const postRoute = Router();

postRoute.post('/', authorizeMiddleware.auth, postController.create);
postRoute.get('/', authorizeMiddleware.auth, postController.get);

module.exports = postRoute;