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

const schemaEdit = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
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
    const result = await models.BlogPost.findByPk(id, {
      include:
        [{ model: models.User, as: 'user', attributes: { exclude: 'password' } },
        { model: models.Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    if (!result) return { code: 404, data: { message: 'Post does not exist' } };
    console.log(result);
    return { code: 200, data: result };
  },

  async edit(dataValues, postId, userId) {
    if (postId !== userId) return { code: 401, data: { message: 'Unauthorized user' } };

    const validation = errorValidation(schemaEdit)(dataValues);
    if (validation) return { code: 400, data: { message: 'Some required fields are missing' } };

    const postValues = {
      title: dataValues.title,
      content: dataValues.content,
    };
    await models.BlogPost.update(postValues, { where: { id: postId } });
    const result = await models.BlogPost.findByPk(
      postId,
      {
        include: [
          { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
          { model: models.Category, as: 'categories' },
        ],
      },
    );
    return { code: 200, data: result };
  },

  async remove(postId, userId) {
    const removePost = await models.BlogPost.findByPk(postId);
    if (!removePost) return { code: 404, data: { message: 'Post does not exist' } };
    if (removePost.userId !== userId) {
      return { code: 401, data: { message: 'Unauthorized user' } };
    }

    await models.PostCategory.destroy({
      where: {
        postId,
      },
    });
    await models.BlogPost.destroy({ where: { id: postId } });

    return { code: 204 };
  },
};

module.exports = postService;