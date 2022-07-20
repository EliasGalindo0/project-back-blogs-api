const authService = require('../services/authService');

const authController = {
  async auth(req, res) {
    const { email, password } = req.body;
    const { code, data } = await authService.auth(email, password);
    res.status(code).json(data);
  },
};

module.exports = authController;