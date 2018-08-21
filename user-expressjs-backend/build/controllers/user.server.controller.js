'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeBookMarkFromUser = exports.addBookMarkInUser = exports.findOrCreateFBUser = exports.loginWithSocial = exports.loginUser = exports.registerUser = exports.authenticate = exports.getUsers = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _userServer = require('../models/user.server.model');

var _userServer2 = _interopRequireDefault(_userServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./user-expressjs-backend/controllers/user.server.controller.js
var generateToken = function generateToken(user) {
  var u = {
    fullName: user.fullName,
    email: user.email,
    _id: user._id,
    picture: user.picture
  };
  var token = _jsonwebtoken2.default.sign(u, 'my-secret', { algorithm: 'HS384' }, {
    expiresIn: 60 * 60 * 1 // expires in 1 hours
  }, function (err, token) {
    return token;
  });

  return token;
};

//import models
var getUsers = exports.getUsers = function getUsers(req, res) {
  console.log('User: ' + JSON.stringify(req.user));
  return res.json({ success: true, message: 'Authenticated Successfully', user: req.user });
};

//middleware that checks if JWT token exists and verifies it if it does exist.
var authenticate = exports.authenticate = function authenticate(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Please Log in using a valid email & password'
    });
  }
  //token = token.replace('Bearer', '');
  _jsonwebtoken2.default.verify(token, 'my-secret', function (err, user) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Please Log in using a valid email & password'
      });
    } else {
      req.user = user;
      next();
    }
  });
};

var registerUser = exports.registerUser = function registerUser(req, res) {
  console.log(req.body);
  var newUser = new _userServer2.default({
    fullName: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    profileType: 'local'
  });
  newUser.save(function (err, user) {
    if (err) {
      if (err.name = 'validationError') {
        return res.json({ success: false, message: 'Email already taken' });
      } else {
        return res.json({ success: false, message: 'Something going wrong' });
      }
    }
    var token = generateToken(user);
    return res.json({
      success: true,
      message: 'Registered Successfully',
      token: token
    });
  });
};

var loginUser = exports.loginUser = function loginUser(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter username and password' });
  }
  console.log(req.body.password);
  _userServer2.default.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      return res.json({ success: false, message: 'Something going wrong' });
    }
    if (!user) {
      return res.json({ success: false, message: 'Invalid Email' });
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (!err && isMatch) {
          var token = generateToken(user);
          return res.json({ success: true, message: 'Authenticated Successfully', user: user, token: token });
        } else {
          return res.json({ success: false, message: 'Invalid Password' });
        }
      });
    }
  });
};

var loginWithSocial = exports.loginWithSocial = function loginWithSocial(req, res) {
  console.log(req.body);
  if (req.body.email && req.body.id) {
    // Look up user by profile id
    var u;
    _userServer2.default.findOne({ profileType: req.body.provider, profileId: req.body.id }, function (err, user) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong' });
      }

      // Create a new user in the user table if not found
      if (!user) {
        var newUser = new _userServer2.default({
          fullName: req.body.name,
          email: req.body.email,
          profileId: req.body.id,
          profileType: req.body.provider,
          gender: req.body.gender,
          picture: req.body.picture,
          password: req.body.id
        });

        newUser.save(function (err, user) {
          if (err) {
            return res.json({ success: false, message: 'Something going wrong' });
          } else {
            u = user;
            var token = generateToken(u);
            return res.json({
              success: true,
              message: 'Registered Successfully',
              token: token
            });
          }
        });
      } else {
        //if user exists in database
        u = user;
        var token = generateToken(u);
        return res.json({
          success: true,
          message: 'Registered Successfully',
          token: token
        });
      }
    });
  }
};

var findOrCreateFBUser = exports.findOrCreateFBUser = function findOrCreateFBUser(profile, done) {
  if (profile) {
    // Look up user by profile id
    var u;
    _userServer2.default.findOne({ profileType: profile.provider, profileId: profile.id }, function (err, user) {
      if (err) {
        return done(err);
      }

      // Create a new user in the user table if not found
      if (!user) {
        console.log(profile);
        var newUser = new _userServer2.default({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          profileId: profile.id,
          profileType: profile.provider,
          gender: profile.gender,
          picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
          password: '1234'
        });

        newUser.save(function (err, user) {
          if (err) {
            return done(err);
          } else {
            u = user;
            var token = generateToken(u);
            return done(null, token);
          }
        });
      } else {
        //if user exists in database
        u = user;
        var token = generateToken(u);
        return done(null, token);
      }
    });
  }
};

var addBookMarkInUser = exports.addBookMarkInUser = function addBookMarkInUser(req, res, next) {
  console.log('addBookMarkInUser: ' + JSON.stringify(req.body));
  var bM = req.bm._id;
  var user = req.bm.user;
  if (bM) {
    _userServer2.default.updateOne({ _id: user }, { $push: { bookMarks: bM } }).exec(function (err, result) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong' });
      } else {
        return res.json({
          success: true,
          message: 'Question Bank Added to Your Bookmarked Qestion Banks.',
          bm: req.bm
        });
      }
    });
  }
};

var removeBookMarkFromUser = exports.removeBookMarkFromUser = function removeBookMarkFromUser(req, res, next) {
  console.log('removeBookMarkFromUser: ' + JSON.stringify(req.qb));
  var bM = req.qbBm._id;
  var user = req.qbBm.user;
  if (bM && user) {
    _userServer2.default.updateOne({ _id: user }, { $pull: { bookMarks: bM } }).exec(function (err, result) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong' });
      } else {
        return res.json({ success: true, message: 'Question Bank Removed From Your BookMarks ', qb: req.qbBm });
      }
    });
  }
};
//# sourceMappingURL=user.server.controller.js.map