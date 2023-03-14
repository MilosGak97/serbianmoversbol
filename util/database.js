
/* radeca verzija
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'milosgak', 'TheDVTN2020',  {
  dialect: 'mysql',
  host: 'mydb.cpi6e39gnpl9.us-east-2.rds.amazonaws.com',
  port: 3306
});

module.exports = sequelize;
*/

const Sequelize = require('sequelize');
const MYSQL_URI = 'mysql://milosgak:TheDVTN2020@mydb.cpi6e39gnpl9.us-east-2.rds.amazonaws.com:3306/node-complete';

const sequelize = new Sequelize(MYSQL_URI);

module.exports = sequelize;