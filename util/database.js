const Sequelize = require('sequelize');

const sequelize = new Sequelize('d73o9ogsm261ep', 'mvablweobsgwzb', '23acf462ca2ee6ad45035ce4e9c8152b50c5e39a4fed5d9c5039a4c9d9192561', {
  dialect: 'mysql',
  host: 'ec2-34-226-11-94.compute-1.amazonaws.com',
  port: 5432
});

module.exports = sequelize; 

/*
const Sequelize = require('sequelize');

const sequelize = new Sequelize(`${process.env.MYSQL_DB}`, `${process.env.MYSQL_USER}`, `${process.env.MYSQL_PWD}`, {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
*/


/*const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'poladva1', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize; */