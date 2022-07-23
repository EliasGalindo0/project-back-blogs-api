const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const postService = require('../services/postService');

const postController = {
  async create(req, res) {
    const userId = authorizeMiddleware.getToken(req.headers.authorization);
    const { code, data } = await postService.create(req.body, userId.data);

    res.status(code).json(data);
  },

  async get(_req, res) {
    const post = await postService.get();
    return res.status(200).json(post);
  },
};

  module.exports = postController;