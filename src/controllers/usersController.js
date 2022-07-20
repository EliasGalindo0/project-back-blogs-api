const usersService = require('../services/usersService');

const usersController = {
  /** @type {import('express').RequestHandler} */
  async list(_req, res) {
    const users = await usersService.list();
    res.json(users);
  },

  /** @type {import('express').RequestHandler} */
  async add(req, res) {
    const data = await usersService.validateBodyAdd(req.body);
    const user = await usersService.add(data);
    res.status(201).json(user);
  },

  /** @type {import('express').RequestHandler} */
  async get(req, res) {
    const { id } = await usersService.validateParamsId(req.params);
    const user = await usersService.getEager(id);
    res.json(user);
  },
};

module.exports = usersController;