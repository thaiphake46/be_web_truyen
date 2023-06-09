'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'Tên của bạn không hợp lệ',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Email của bạn không hợp lệ',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAuthor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      refreshToken: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
