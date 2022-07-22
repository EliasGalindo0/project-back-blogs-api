const { DataTypes } = require('sequelize')

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  displayName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
}

module.exports = (sequelize) => {
  const user = sequelize.define('User', attributes, { timestamps: false })

  user.associate = (models) => {
    user.hasMany(models.BlogPost, {
      as: 'posts',
      foreignKey: 'userId'
    })
  }

  return user
};