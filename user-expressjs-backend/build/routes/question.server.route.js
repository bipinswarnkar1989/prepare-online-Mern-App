'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userServer = require('../controllers/user.server.controller');

var userController = _interopRequireWildcard(_userServer);

var _questionServer = require('../controllers/question.server.controller');

var questionController = _interopRequireWildcard(_questionServer);

var _quesOptionServer = require('../controllers/quesOption.server.controller');

var _quesOptionServer2 = _interopRequireDefault(_quesOptionServer);

var _qBankServer = require('../controllers/qBank.server.controller');

var qBankController = _interopRequireWildcard(_qBankServer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var quesOptionCtrlObj = new _quesOptionServer2.default(); // ./user-expressjs-backend/routes/question.server.route.js


var router = _express2.default.Router();

router.route('/question').post(userController.authenticate, questionController.createQuestion, qBankController.addQuestoQb, quesOptionCtrlObj.createOption).put(userController.authenticate, quesOptionCtrlObj.updateOption, questionController.updateQuestion);
router.route('/questions/:qBid/:page/:limit').get(questionController.countQuestions, questionController.fetchQuestions);
router.route('/question/:quesId').delete(userController.authenticate, questionController.deleteQuestion, quesOptionCtrlObj.deleteOptions);

exports.default = router;
//# sourceMappingURL=question.server.route.js.map