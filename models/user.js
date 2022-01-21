'use strict';
const {hash} = require('../helpers/hash-helper')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie, {foreignKey: "authorId"})
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: {
          msg : 'Username is require'
        },
        notEmpty: {
          msg: 'username cannot be empty'
        }
      }
    },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate : {
      isEmail: {
        msg: 'Email formata is not valid'
      }, 
      notNull: {
        args : true,
        msg : 'Email is require'
      }, 
      notEmpty: {
        msg: 'Email cannot be empty'
      }
    }
  },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate : {
      len : {
        args : [5],
        msg : 'password minimal 5 character'
      },
      notNull : {
        msg :{
          args : true,
          msg : 'password is require'
        },
        notEmpty: {
          msg: 'password cannot be empty'
        }
      }
    }
  },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate : (user) => {
        user.password = hash(user.password)
      }
    }
  });
  return User;
};