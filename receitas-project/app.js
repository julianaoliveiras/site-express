// var createHttpError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var passport = require('passport');
// var session = require('express-session');

// require('dotenv').config();
var cookieParser = require('cookie-parser');
var dotenv = require('dotenv');
var express = require('express');
var session = require('express-session');
var createHttpError = require('http-errors');
var logger = require('morgan');
var passport = require('passport');
var path = require('path');
var contatoRouter = require('./routes/contato');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registrarRouter = require('./routes/registrar');
var sobreRouter = require('./routes/sobre');
var tecnologiasRouter = require('./routes/tecnologias'); 
var receitasRouter = require('./routes/receitas'); 
 
dotenv.config();  

function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login?fail=true');
} 

const app = express();  

// view engine setup
const mustacheExpress = require('mustache-express');
const engine = mustacheExpress();

app.engine('mustache', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

require('./auth')(passport);
app.use(
  session({
    secret: '123', //configure um segredo seu aqui,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }, //30min
  })
); 
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/contato', contatoRouter);
app.use('/login', loginRouter);
app.use('/registrar', registrarRouter);
app.use('/sobre', sobreRouter);
app.use('/tecnologias', tecnologiasRouter); 
app.use('/receitas', receitasRouter);
 
// catch 404 and forward to error handler  
app.use(function (req, res, next) {                   
  next(createHttpError(404));                       
});     
 
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500); 
  // res.render('error');
  console.log(err);
});

module.exports = app;
