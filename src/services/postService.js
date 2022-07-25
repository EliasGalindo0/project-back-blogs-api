const Joi = require('joi');
const models = require('../database/models');
const checkCategory = require('../middlewares/checkCategories');
const errorValidation = require('../middlewares/errorValidation');
require('dotenv').config();

const schemaPost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const postService = {
  async create(values, userId) {
    const fieldsValidation = errorValidation(schemaPost)(values);
    if (fieldsValidation) {
      return { code: 400, data: { message: 'Some required fields are missing' } };
    }

    // const { categoryId } = values;
    const categories = await checkCategory(values.categoryId);
    if (!categories) return { code: 400, data: { message: '"categoryIds" not found' } };

    const postValues = {
      title: values.title,
      content: values.content,
      userId,
    };
    const newPost = await models.BlogPost.create(postValues);
    Promise.all(
      categories.map(async ({ id }) => models.PostCategory
      .create({ postId: newPost.id, categoryId: id })),
      );
    return { code: 201, newPost };
  },

  async get() {
    const posts = await models.BlogPost.findAll({
      include:
      [{ model: models.User, as: 'user', attributes: { exclude: 'password' } },
      { model: models.Category, as: 'categories', through: { attributes: [] } }, 
      ],
    }); 
    return { code: 200, posts };
  },

  async getById(id) {
    const result = await models.BlogPost.findByPk(id,
      { include: [
        { model: models.User, as: 'user', attributes: { exclude: 'password' } }, 
        { model: models.Category, as: 'categories', through: { attributes: [] } },
    ],
  });
    return result;
  },
};

module.exports = postService;