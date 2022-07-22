'use strict';
const { DataTypes } = require('sequelize')

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  published: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  updated: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  }
}

module.exports = (sequelize) => {
  const blogPost = sequelize.define('BlogPost', attributes, { timestamps: false });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    })
  }

  return blogPost;
};