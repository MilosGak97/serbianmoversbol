const path = require('path');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');

app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'signatures')));

app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: false
}));

app.use('/admin', adminRoutes);
app.use(customerRoutes);

console.log(process.env.NODE_ENV);
sequelize
  //.sync({ force: true })
  .sync()
  .then(result => {
    //console.log(result);
    app.listen( process.env.PORT ||3000);
  })
  .catch(err => {
    console.log(err);
  });