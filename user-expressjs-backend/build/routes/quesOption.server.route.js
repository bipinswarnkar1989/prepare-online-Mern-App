'use strict';

Object.defineProperty(exports, "__esModule", {
         value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _quesOptionServer = require('../controllers/quesOption.server.controller');

var _quesOptionServer2 = _interopRequireDefault(_quesOptionServer);

var _userServer = require('../controllers/user.server.controller');

var userController = _interopRequireWildcard(_userServer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // ./user-expressjs-backend/routes/quesOption.server.route.js

var optCtrlObj = new _quesOptionServer2.default();
router.route('/').post(userController.authenticate, optCtrlObj.createOption);

exports.default = router;
//# sourceMappingURL=quesOption.server.route.js.map