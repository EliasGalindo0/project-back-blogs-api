const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    jwt.verify(authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const getToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  auth,
  getToken,
};