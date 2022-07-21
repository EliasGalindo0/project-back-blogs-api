const jwt = require('jsonwebtoken');
const models = require('../database/models');
const errorHandler = require('../middlewares/errorHandler');
require('dotenv').config();

const loginService = {
  async auth(email, pass) {
    if (!email || !pass) throw errorHandler(400, 'Some required fields are missing');

    const user = await models.User.findOne({
      where: { email, password: pass },
    });

    if (!user) throw errorHandler(400, 'Invalid fields');
    const { id } = user;
    const token = jwt.sign({ data: id }, process.env.JWT_SECRET);

    return { code: 200, data: { token } };
  },
};

module.exports = loginService;