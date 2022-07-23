const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const postService = require('../services/postService');

const postController = {
  async create(req, res) {
    const userId = authorizeMiddleware.getToken(req.headers.authorization);
    const { code, data } = await postService.create(req.body, userId.data);

    res.status(code).json(data);
  },

  async get(_req, res) {
    const { code, posts } = await postService.get();
    return res.status(code).json(posts);
  },

  async getById(req, res) {
    const { id } = req.params;
    const response = await postService.getPostById(id);
    console.log(response);
    if (!response) {
        return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(response);
  },
};

  module.exports = postController;