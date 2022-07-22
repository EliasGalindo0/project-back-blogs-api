'use strict';
const { DataTypes } = require('sequelize')

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
}

module.exports = (sequelize) => {
  const category = sequelize.define('Category', attributes, { timestamps: false })
  return category;
};