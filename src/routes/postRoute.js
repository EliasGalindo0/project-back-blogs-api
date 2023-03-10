const { Router } = require('express');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const postController = require('../controllers/postController');

const postRoute = Router();

postRoute.get('/search', authorizeMiddleware.auth, postController.find);
postRoute.delete('/:id', authorizeMiddleware.auth, postController.remove);
postRoute.get('/:id', authorizeMiddleware.auth, postController.getById);
postRoute.get('/', authorizeMiddleware.auth, postController.get);
postRoute.put('/:id', authorizeMiddleware.auth, postController.edit);
postRoute.post('/', authorizeMiddleware.auth, postController.create);

module.exports = postRoute;