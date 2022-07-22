const Joi = require('joi');
const models = require('../database/models');
const errorValidation = require('../middlewares/errorValidation');
require('dotenv').config();

const schemaCat = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '400|"name" is required',
  }),
});

const categoryService = {
  async create(values) {
    const error = errorValidation(schemaCat)(values);
    if (error) {
      return { code: error[0], data: { message: error[1] } };
    }

    const newCategory = await models.Category.create({ name: values.name });
    return { code: 201, data: newCategory };
  },

  async get() {
    const getCategory = await models.Category.findAll();
    return getCategory;
  },
};

module.exports = categoryService;