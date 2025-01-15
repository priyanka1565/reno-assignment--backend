const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER_NAME,process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: true,
    timezone : '+05:30'
})

module.exports = sequelize;