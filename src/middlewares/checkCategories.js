const models = require('../database/models');

const checkCategory = async (categories) => {
  const findCategories = await Promise.all(categories.map((category) =>
    models.Category.findByPk(category, { raw: true })));

  const areCategoriesExist = findCategories.filter((category) => category !== null);

  if (areCategoriesExist.length > 0) return areCategoriesExist;
  return false;
};

module.exports = checkCategory;