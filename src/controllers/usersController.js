const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const usersService = require('../services/usersService');

const usersController = {

  /** @type {import('express').RequestHandler} */
  async create(req, res) {
    const { code, data } = await usersService.create(req.body);

    res.status(code).json(data);
  },

  /** @type {import('express').RequestHandler} */
  async getAll(_req, res) {
    const users = await usersService.getAll();
    res.json(users);
  },

  /** @type {import('express').RequestHandler} */
  async getById(req, res) {
    const { id } = req.params;
    const { code, data } = await usersService.getById(+id);
    res.status(code).json(data);
  },

  /** @type {import('express').RequestHandler} */
  async remove(req, res) {
    const userId = authorizeMiddleware.getToken(req.headers.authorization);
    await usersService.remove(userId.data);
    res.status(204).end();
  },
};

module.exports = usersController;