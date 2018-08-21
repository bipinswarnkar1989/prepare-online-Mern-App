'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _userServer = require('../controllers/user.server.controller');

var userController = _interopRequireWildcard(_userServer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// get an instance of express router
var router = _express2.default.Router();

//import controller file
// ./user-expressjs-backend/routes/user.server.route.js


router.get('/getuser', userController.authenticate, userController.getUsers);
router.post('/signup', userController.registerUser);
router.post('/signin', userController.loginUser);
router.post('/signupwithSocial', userController.loginWithSocial);
// router.get('/login/facebook/return',
//   passport.authenticate('facebook', {failureRedirect: 'http://localhost:3000/login'}),
//   function (req, res) {
//     res.redirect('http://localhost:3000/home');
//   }
// );

exports.default = router;
//# sourceMappingURL=user.server.route.js.map