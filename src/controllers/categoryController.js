const categoryService = require('../services/categoryService');

const categoryController = {

  async create(req, res) {
    const { name } = req.body;
    const category = await categoryService.create(name);
    res.status(201).json(category);
  },

  async get(req, res) {
    const categories = await categoryService.get();
    res.status(200).json(categories);
  },
};

module.exports = categoryController;