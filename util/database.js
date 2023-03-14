
const Sequelize = require('sequelize');
/* radeca verzija
const sequelize = new Sequelize('node-complete', 'milosgak', 'TheDVTN2020',  {
  dialect: 'mysql',
  host: 'mydb.cpi6e39gnpl9.us-east-2.rds.amazonaws.com',
  port: 3306
});

module.exports = sequelize;
*/

/*
const Sequelize = require('sequelize');
const MYSQL_URI = 'mysql://milosgak:TheDVTN2020@mydb.cpi6e39gnpl9.us-east-2.rds.amazonaws.com:3306/node-complete';

const sequelize = new Sequelize(MYSQL_URI);

module.exports = sequelize;

*/

const sequelize = new Sequelize('node-complete', 'milosgak', 'TheDVTN2020', {
  host: 'mydb.cpi6e39gnpl9.us-east-2.rds.amazonaws.com',
  dialect: 'mysql',
  logging: true, 
  port: 3306
});

/*

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  */

  
module.exports = sequelize;