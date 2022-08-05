const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const postService = require('../services/postService');

const postController = {
  async create(req, res) {
    const userId = authorizeMiddleware.getToken(req.headers.authorization);
    const { code, data } = await postService.create(req.body, userId.data);
    console.log({ code, data });

    res.status(code).json(data);
  },

  async get(_req, res) {
    const { code, posts } = await postService.get();
    return res.status(code).json(posts);
  },

  async getById(req, res) {
    const { id } = req.params;
    const { code, data } = await postService.getById(id);

    return res.status(code).json(data);
  },

  async edit(req, res) {
    const userId = authorizeMiddleware.getToken(req.headers.authorization);
    const { body } = req;
    const { id } = req.params;
    const { code, data } = await postService.edit(body, Number(id), Number(userId.data));

    res.status(code).json(data);
  },
};

module.exports = postController;