const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'milosgak', 'TheDVTN2020', 'mysql', {
  host: 'mydb.cpi6e39gnpl9.us-east-2.rds.amazonaws.com',
  port: 3306
});

module.exports = sequelize;



/*const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'poladva1', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize; */