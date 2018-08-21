'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _configureAuth = require('./config/configureAuth');

var _configureAuth2 = _interopRequireDefault(_configureAuth);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _userServer = require('./routes/user.server.route');

var _userServer2 = _interopRequireDefault(_userServer);

var _qBankServer = require('./routes/qBank.server.route');

var _qBankServer2 = _interopRequireDefault(_qBankServer);

var _questionServer = require('./routes/question.server.route');

var _questionServer2 = _interopRequireDefault(_questionServer);

var _qBankBookMarkServer = require('./routes/qBankBookMark.server.route');

var _qBankBookMarkServer2 = _interopRequireDefault(_qBankBookMarkServer);

var _quesOptionServer = require('./routes/quesOption.server.route');

var _quesOptionServer2 = _interopRequireDefault(_quesOptionServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// define our app using express
// ./user-expressjs-backend/index.js
var app = (0, _express2.default)();

// set the port


// import routes
var port = process.env.PORT || 3001;

// middleware to allow-cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Requested-With");
  next();
});

// configure the app
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
app.use(_express2.default.static('public'));

//passport configuration
(0, _configureAuth2.default)(_passport2.default, app, _config2.default);

// connect to mongodb
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://localhost/prepare-online-mern', {
  useMongoClient: true
});

// add Source Map Support
_sourceMapSupport2.default.install();

// connect to route
app.use('/api/user', _userServer2.default);
app.use('/api/qbank', _qBankServer2.default);
app.use('/api/question', _questionServer2.default);
app.use('/api/qbbookmark', _qBankBookMarkServer2.default);
app.use('/api/option', _quesOptionServer2.default);

app.get('/login/facebook', _passport2.default.authenticate('facebook', {
  scope: 'email'
}));

app.get('/login/facebook/return', _passport2.default.authenticate('facebook', {
  //successRedirect:'http://localhost:3000/',
  failureRedirect: 'http://localhost:3000/login'
}), function (req, res) {
  console.log('User: ' + req.user);
  console.log('userToken: ' + req.usertoken);
  res.header('Authorization', req.user);
  localStorage.setItem('userToken', req.user);
  res.redirect('http://localhost:3000/');
});

app.get('/', function (req, res) {
  return res.end('Api working');
});

// catch 404
app.use(function (req, res, next) {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

app.listen(port, function () {
  console.log('App server is listening at ' + port);
});
//# sourceMappingURL=index.js.map