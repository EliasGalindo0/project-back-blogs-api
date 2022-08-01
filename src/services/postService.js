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
  async create(dataValues, userId) {
    const fieldsValidation = errorValidation(schemaPost)(dataValues);
    if (fieldsValidation) {
      return { code: 400, data: { message: 'Some required fields are missing' } };
    }

    const categories = await checkCategory(dataValues.categoryIds);
    if (!categories) return { code: 400, data: { message: '"categoryIds" not found' } };

    const postValues = {
      title: dataValues.title,
      content: dataValues.content,
      userId,
    };
    const newPost = await models.BlogPost.create(postValues);
    await Promise.all(
      categories.map(({ id }) => models.PostCategory
        .create({ postId: newPost.id, categoryId: id })),
    );
    return { code: 201, data: newPost };
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
      {
        include: [
          { model: models.User, as: 'user', attributes: { exclude: 'password' } },
          { model: models.Category, as: 'categories', through: { attributes: [] } },
        ],
      });
    return result;
  },
};

module.exports = postService;