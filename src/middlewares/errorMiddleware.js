module.exports = (error, req, res, _next) => {
  res.status(500).json({ message: error.message });
};