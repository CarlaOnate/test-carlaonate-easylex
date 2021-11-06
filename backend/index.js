require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const session = require('express-session');

mongoose
    .connect(process.env.DB, )
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error('Error connecting to mongo', err));


const app = express();

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
      methods: "GET,PUT,PATCH,POST,DELETE",
    })
)

app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SECRET,
      cookie: { maxAge: 1000 * 60 * 60 },
    })
);


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));

const index = require('./src/routes/index');
app.use('/', index)
app.use('/cart', require('./src/routes/cart'))
app.use('/products', require('./src/routes/products'))

module.exports = app
