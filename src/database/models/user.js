const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const atributtes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  displayName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
};

module.exports = (sequelize) => {
/**
 * @param {import('sequelize').Sequelize} sequelize
*/
  const model = sequelize.define('User', atributtes, {
    tableName: 'Users',
    timestamps: false
  });
  model.associate = (models) => {
    model.hasMany(models.BlogPost, {
      foreingKey: 'userId',
    })
  }
  return model;
};