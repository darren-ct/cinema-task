const {DataTypes} = require("sequelize");
const sequelize = require("../config/connect");

const Transaction = sequelize.define("transaction", {
    transaction_id : {
      type: DataTypes.INTEGER,
      primaryKey : true
    },
    buyer_id : {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey : true
    },
    movie_id : {
        type: DataTypes.INTEGER,
        primaryKey : true
    },

    status : {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:true,
    freezeTableName:true
})

Transaction.sync();

module.exports = Transaction;