const path = require('path');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session); /* test */
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

/* ------------- SEQUELIZE CONNECTION -------------- 
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'milosgak', 'TheDVTN2020', {
  host: 'mydb.cpi6e39gnpl9.us-east-2.rds.amazonaws.com',
  dialect: 'mysql',
  logging: true, 
  port: 3306
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  /* ----------------- END SEQUEKL */


/* MYSQL_URI TEST */
const MYSQL_URI = `mysql://milosgak:TheDVTN2020@mydb.cpi6e39gnpl9.us-east-2.rds.amazonaws.com:3306/node-complete`;

/* JEAAAAAJ */
const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname,'access.log'),
  {
    flags: 'a'
  }
)
/* test */
const options = {
  host: 'mydb.cpi6e39gnpl9.us-east-2.rds.amazonaws.com',
  user: 'milosgak',
  password: 'TheDVTN2020',
  database: 'node-complete',
  port: 3306,
  schema: {
      tableName: 'sessions',
      columnNames: {
          session_id: 'session_id',
          expires: 'expires',
          data: 'data'
      }
  }
}; /* test end */

const store = new MySQLStore(options); /* test */

app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  store: store
}));
 /* test end with code above */


app.use(compression());
app.use(helmet());
app.use(morgan('combined', {stream: accessLogStream}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'signatures')));


/*
app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: false
}));
*/

app.use('/admin', adminRoutes);
app.use(customerRoutes);

console.log(process.env.NODE_ENV);
sequelize
  //.sync({ force: true })
  .sync()
  .then(result => {
    //console.log(result);
    app.listen(8080);
  })
  .catch(err => {
    console.log(err);
  });