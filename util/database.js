/*const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'poladva1', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize; */


const Sequelize = require('sequelize');

const sequelize = new Sequelize(`${process.env.MYSQL_DB}`, `${process.env.MYSQL_USER}`, `${process.env.MYSQL_PWD}`, {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;

