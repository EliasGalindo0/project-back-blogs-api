const models = require('../database/models');

const checkCategory = (categories) => {
  const findCategories = Promise.all(categories.map(async (category) =>
  models.Category.findByPk(category, { raw: true })));
  
  const areCategoriesExist = findCategories.filter((category) => category !== null);

  if (areCategoriesExist.length > 0) return areCategoriesExist;
  return false;
};

module.exports = checkCategory;