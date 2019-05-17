const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const apiCity = require('./routes/city_data');
const getInfoForCurrentPosition = require('./routes/current-position-weater');
const compression = require('compression');
require('dotenv').config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(compression());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-city', apiCity);
app.use('/current-position', getInfoForCurrentPosition);

let frontDir = path.join(__dirname, '..', 'dist');
global.frontDir = frontDir;
app.use(express.static(frontDir));

app.get('*', function(req, res) {
  res.sendFile(path.join(global.frontDir + '/index.html'));
  console.log("Connected");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT, () => console.log('Server started successfully'));
