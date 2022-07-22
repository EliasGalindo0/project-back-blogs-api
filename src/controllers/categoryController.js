const categoryService = require('../services/categoryService');

const categoryController = {

  async create(req, res) {
    const { code, data } = await categoryService.create(req.body);
    res.status(code).json(data);
  },

  async get(_req, res) {
    const categories = await categoryService.get();
    res.status(200).json(categories);
  },
};

module.exports = categoryController;