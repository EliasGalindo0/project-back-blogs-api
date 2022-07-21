const loginService = require('../services/loginService');

const loginController = {
  async auth(req, res, next) {
    try {
      const { email, password } = req.body;
      const { code, data } = await loginService.auth(email, password);
      res.status(code).json(data);
    } catch (err) {
      return err.message
        ? res.status(err.status).json({ message: err.message }) : next(err);
    }
  },
};

module.exports = loginController;