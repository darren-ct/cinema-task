const {DataTypes} = require("sequelize");
const sequelize = require("../config/connect");

const Favorite = sequelize.define("favorite", {
    movie_id : {
        type: DataTypes.INTEGER,
        primaryKey:true
        
    },
    user_id : {
        type: DataTypes.INTEGER,
        primaryKey:true,
    
    }

},{
    timestamps:false,
    freezeTableName:true
})

Favorite.sync();

module.exports = Favorite;