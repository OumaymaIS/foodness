var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const configDB = require('./config/database.json');
var mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var donRoutes=require('./routes/don/don_route');
var commentaireRouter=require('./routes/commentaire/commentaire_route')
var notificationaireRouter = require('./routes/notification/notification_route');
var organisationRouter=require('./routes/organisation/organisation');
var app = express();
var port =3000;
mongoose 
.connect(configDB.mongo.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("connected");
})
.catch((err) => {
  console.log(err);
});
// view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dons',donRoutes);
app.use('/commentaire',commentaireRouter);
app.use('/notification',notificationaireRouter);
app.use('/organisation',organisationRouter);
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

app.listen(3000, function () {
  console.log('Example app listening on port ' + port + '!');
});
//module.exports = app;
