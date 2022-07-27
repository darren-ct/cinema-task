const {DataTypes} = require("sequelize");
const sequelize = require("../config/connect");

const Movie = sequelize.define("movie", {
    movie_id : {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    title : {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    thumbnail : {
        type: DataTypes.STRING,
        allowNull:false
    },

    price : {
        type: DataTypes.INTEGER,
        allowNull:false
    },

    description : {
        type: DataTypes.STRING,
        allowNull:false
    },

    link : {
        type: DataTypes.STRING,
        allowNull:false
    },

    category_id : {
        type: DataTypes.INTEGER,
        allowNull:false
    },

},{
    timestamps:false,
    freezeTableName:true
})

Movie.sync();

module.exports = Movie;