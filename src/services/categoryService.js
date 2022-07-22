// const Joi = require('joi');
// const models = require('../database/models');
// require('dotenv').config();

// const schemaUser = Joi.object({
//   name: Joi.string().required().messages({
//     'any.required': '400|"name" is required',
//   }),
// });

// const categoryService = {
//   async create(values) {
//     if (!values) throw error

//     const newCategory = await models.Category.create({ values }, { raw: true });
//     return newCategory;
//   },

//   async get() {
//     const getCategory = await models.Category.findAll({ raw: true });
//     return getCategory;
//   },
// };

// module.exports = categoryService;