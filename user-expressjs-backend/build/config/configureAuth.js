'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportFacebook = require('passport-facebook');

var _userServer = require('../controllers/user.server.controller');

var userController = _interopRequireWildcard(_userServer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var configureAuth = function configureAuth(passport, app, config) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  //Facebook Authentication
  passport.use(new _passportFacebook.Strategy({
    //pull in your app id and secret from your auth.js file
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL,
    profileFields: ['id', 'name', 'picture.type(large)', 'emails', 'displayName', 'about', 'gender']
  }, function (req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      var usertoken = userController.findOrCreateFBUser(profile, done);
      return usertoken;
    });
  }));
};

exports.default = configureAuth;
//# sourceMappingURL=configureAuth.js.map