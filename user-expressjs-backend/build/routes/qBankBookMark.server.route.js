'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userServer = require('../controllers/user.server.controller');

var userController = _interopRequireWildcard(_userServer);

var _qBankBookMarkServer = require('../controllers/qBankBookMark.server.controller');

var qbBookMarkController = _interopRequireWildcard(_qBankBookMarkServer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // ./user-expressjs-backend/routes/qBankBookMark.server.route.js


router.route('/qbBookmark').post(userController.authenticate, qbBookMarkController.createBookMark, userController.addBookMarkInUser).delete(userController.authenticate, qbBookMarkController.removeBookMark, userController.removeBookMarkFromUser);

router.route('/qbCheckBookmark').post(userController.authenticate, qbBookMarkController.checkIsBookMarked);

exports.default = router;
//# sourceMappingURL=qBankBookMark.server.route.js.map