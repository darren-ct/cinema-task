const Sequelize = require("sequelize");
const sequelize = new Sequelize ("cinema","root", "mysql.mik.158",{
    host:"localhost",
    port : 3306,
    dialect: "mysql"
});


module.exports = sequelize;