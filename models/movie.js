'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Genre, {foreignKey: "genreId"})
      Movie.belongsTo(models.User, {foreignKey: "authorId"})
    }
  };
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : { 
        notEmpty: {
          msg: "Title tidak boleh kosong"
        },
        notNull: {
          msg : 'Title null'
        }
      }
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate : {
        notEmpty: {
          msg: "Synopsis tidak boleh kosong"
        },
        notNull: {
          msg : 'Synopsis null'
        }
      }
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate : {
        min: {
          args: [
            [1]
          ],
          msg :' rating harus lebih dari 1'
        }

      }
    },
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};