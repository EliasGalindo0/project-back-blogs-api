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
    const isErrValid = errorValidation(schemaPost)(values);
    if (isErrValid) return { code: 400, data: { message: 'Some required fields are missing' } };

    // const { categoryId } = values;
    const areCategoriesExist = await checkCategory(values.categoryId);
    if (!areCategoriesExist) return { code: 400, data: { message: '"categoryIds" not found' } };

    const newPostValues = {
      title: values.title,
      content: values.content,
      userId,
    };
    const newPost = await models.BlogPost.create(newPostValues);
    Promise.all(
      areCategoriesExist.map(async ({ id }) => models.PostCategory
      .create({ postId: newPost.id, categoryId: id })),
      );
    return { code: 201, data: newPost };
  },

  async get() {
    const posts = await models.BlogPost.findAll({
      include:
      [{ model:
        models.User, 
        as: 'user', 
        attributes: { exclude: 'password' },  
        },
      { model:
        models.Category,
        as: 'categories',
        through: { attributes: [] } }, 
      ],
    }); 
    return posts;
  },
};

module.exports = postService;