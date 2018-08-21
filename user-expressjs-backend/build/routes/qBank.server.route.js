'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _qBankServer = require('../controllers/qBank.server.controller');

var qBankController = _interopRequireWildcard(_qBankServer);

var _userServer = require('../controllers/user.server.controller');

var userController = _interopRequireWildcard(_userServer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // ./user-expressjs-backend/routes/qBank.server.route.js


router.route('/Qbanks').post(userController.authenticate, qBankController.UploadImage, qBankController.createQbank).put(userController.authenticate, qBankController.UploadImage, qBankController.updateQbank);

router.route('/Qbanks/search/:q').get(qBankController.searchQbanks);

router.route('/Qbanks/deleteMultipleQbanks').post(qBankController.multipleDeleteQb);

router.route('/Qbanks/:page/:limit').get(qBankController.countQbanks, qBankController.getAllQbanks);

router.route('/Qbank/latestQbanks').get(qBankController.getLatestqBanks);

router.route('/Qbank/:id').get(qBankController.getqBankById).delete(userController.authenticate, qBankController.deleteqBankById);

router.route('/esSearch/:q').get(qBankController.searchQbInEs);

exports.default = router;
//# sourceMappingURL=qBank.server.route.js.map