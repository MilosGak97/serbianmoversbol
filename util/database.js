const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'poladva1', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
