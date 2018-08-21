'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQuestion = exports.deleteQuestion = exports.countQuestions = exports.fetchQuestions = exports.createQuestion = undefined;

var _userServer = require('../models/user.server.model');

var _userServer2 = _interopRequireDefault(_userServer);

var _qBankServer = require('../models/qBank.server.model');

var _qBankServer2 = _interopRequireDefault(_qBankServer);

var _questionServer = require('../models/question.server.model');

var _questionServer2 = _interopRequireDefault(_questionServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createQuestion = exports.createQuestion = function createQuestion(req, res, next) {
  console.log('createQuestion: ' + JSON.stringify(req.body));
  if (req.body.question && req.body.options) {
    var newQuestion = new _questionServer2.default();
    newQuestion.question = req.body.question;
    newQuestion.author = req.body.author;
    newQuestion.qbank = req.body.qbank;
    newQuestion.save(function (err, ques) {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: 'Something going wrong', err: err });
      } else {
        if (ques) {
          req.ques = ques;
          next();
        } else {
          return res.json({ success: false, message: 'Something going wrong' });
        }
      }
    });
  } else {
    return res.json({ success: false, message: 'Failed. Fill all fields.' });
  }
}; // ./user-expressjs-backend/controllers/question.server.controller.js
var fetchQuestions = exports.fetchQuestions = function fetchQuestions(req, res) {
  console.log('fetchQuestions: ' + JSON.stringify(req.params));
  var qBid = req.params.qBid || null;
  var page = parseInt(req.params.page) || null;
  var limit = parseInt(req.params.limit) || null;
  var last_skip_value = limit * (page - 1);
  if (qBid && page && limit) {
    _questionServer2.default.find({ qbank: qBid }).populate({
      path: 'options',
      options: { limit: 10 }
    }).limit(limit).skip(last_skip_value).exec(function (err, ques) {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: 'Something going wrong', err: err });
      } else {
        if (ques) {
          return res.json({
            success: true,
            message: 'Questions Fetched Successfully',
            count: req.count,
            ques: ques
          });
        } else {
          return res.json({ success: false, message: 'Something going wrong' });
        }
      }
    });
  }
};

var countQuestions = exports.countQuestions = function countQuestions(req, res, next) {
  var qBid = req.params.qBid || null;
  if (qBid) {
    _questionServer2.default.find({ qbank: qBid }).count(function (err, count) {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: 'Something going wrong', err: err });
      } else {
        req.count = count;
        next();
      }
    });
  }
};

var deleteQuestion = exports.deleteQuestion = function deleteQuestion(req, res, next) {
  console.log('deleteQuestion: ' + JSON.stringify(req.params));
  var quesId = req.params.quesId;
  if (quesId) {
    _questionServer2.default.findByIdAndRemove(quesId, function (err, ques) {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: 'Something going wrong', err: err });
      } else {
        if (ques) {
          console.log(ques);
          req.ques = ques;
          next();
        } else {
          return res.json({ success: false, message: 'Something going wrong' });
        }
      }
    });
  }
};

var updateQuestion = exports.updateQuestion = function updateQuestion(req, res) {
  console.log('updateQuestion: ' + JSON.stringify(req.body));
  if (req.body) {
    var id = req.body._id;
    _questionServer2.default.findOneAndUpdate({ _id: id }, { $set: req.body }, { 'new': true }).populate({
      path: 'options',
      options: { limit: 10 }
    }).exec(function (err, ques) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong', err: err });
      } else {
        if (ques) {
          return res.json({
            success: true,
            message: 'Question Updated Successfully',
            ques: ques
          });
        }
      }
    });
  }
};
//# sourceMappingURL=question.server.controller.js.map