const { DataTypes } = require('sequelize');

const atributtes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.INTEGER,
    foreingKey: true,
  },
  published: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updated: {
    allowNull: false,
    type: DataTypes.DATE,
  }
};

module.exports = (sequelize) => {
/**
 * @param {import('sequelize').Sequelize} sequelize
*/

  const model = sequelize.define('BlogPost', atributtes, {
  tableName: 'BlogPosts',
  timestamps: false
  });
  model.associate = (models) => {
    model.belongsTo(models.User, {
      foreingKey: 'userId',
    })
  }
  return model;
};