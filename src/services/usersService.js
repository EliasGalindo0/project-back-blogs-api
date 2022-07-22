const Joi = require('joi');
const jwt = require('jsonwebtoken');
const models = require('../database/models');
const errorValidation = require('../middlewares/errorHandler');
require('dotenv').config();

const schemaUser = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '400|"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '400|"email" must be a valid email',
  }),
  password: Joi.string().min(6).messages({
    'string.min': '400|"password" length must be at least 6 characters long',
  }),
  image: Joi.string(),
});

const usersService = {
  async create(values) {
    const error = errorValidation(schemaUser)(values);
    if (error) {
      return { code: error[0], data: { message: error[1] } };
    }

    const emailRegistered = await models.User.findOne({ where: { email: values.email } });
    if (emailRegistered) return { code: 409, data: { message: 'User already registered' } };

    const newUser = await models.User.create(values, { raw: true });
    const { dataValues: { id } } = newUser;
    const token = jwt.sign({ data: id }, process.env.JWT_SECRET);

    return { code: 201, data: { token } };
  },

  async getAll() {
    return models.User.findAll({ attributes: { exclude: ['password'] } });
  },

  async getById(id) {
    const user = await models.User.findByPk(id, { raw: true });
    if (!user) return { code: 404, data: { message: 'User does not exist' } };

    const { password, ...restDataUser } = user;
    return { code: 200, data: restDataUser };
  },

  async remove(id) {
    const postByUser = await models.BlogPost.findAll({ where: { userId: id } }, { raw: true });

    await Promise.all(
      postByUser.map(async (post) => models.PostCategory.destroy({ where: { postId: post.id } })),
    );
    await models.BlogPost.destroy({ where: { userId: id } });
    await models.User.destroy({ where: { id } });
  },
};

module.exports = usersService;