const { DataTypes} = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const atributtes = {
  postId: {
    type: DataTypes.INTEGER,
    foreingKey: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    foreingKey: true,
  },
};

module.exports = (sequelize) => {
/**
 * @param {import('sequelize').Sequelize} sequelize
*/
  const model = sequelize.define('PostCategory',  atributtes, {
    tableName: 'PostCategories',
    timestamps: false
  });
  model.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: model,
      foreingKey: 'categoryId',
      otherKey: 'postId',
    })
    models.BlogPost.belongsToMany(models.Category, {
      through: model,
      foreingKey: 'postId',
      otherKey: 'categoryId',
    })
}
  return model;
};