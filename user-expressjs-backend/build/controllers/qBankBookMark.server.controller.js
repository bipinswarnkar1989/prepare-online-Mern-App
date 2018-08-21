'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeBookMark = exports.checkIsBookMarked = exports.createBookMark = undefined;

var _userServer = require('../models/user.server.model');

var _userServer2 = _interopRequireDefault(_userServer);

var _qBankServer = require('../models/qBank.server.model');

var _qBankServer2 = _interopRequireDefault(_qBankServer);

var _qBankBookMarkServer = require('../models/qBankBookMark.server.model');

var _qBankBookMarkServer2 = _interopRequireDefault(_qBankBookMarkServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createBookMark = exports.createBookMark = function createBookMark(req, res, next) {
  console.log('createBookMark: ' + JSON.stringify(req.body));
  var userId = req.body.userId;
  var qbId = req.body.qbId;
  if (userId && qbId) {
    var newQBankBookMark = new _qBankBookMarkServer2.default({
      user: userId,
      qBank: qbId
    });
    newQBankBookMark.save(function (err, bm) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong', err: err });
      } else {
        req.bm = bm;
        next();
      }
    });
  }
}; // ./user-expressjs-backend/controllers/qBankBookMark.server.controller.js
var checkIsBookMarked = exports.checkIsBookMarked = function checkIsBookMarked(req, res) {
  console.log('checkIsBookMarked: ' + JSON.stringify(req.body));
  var userId = req.body.userId;
  var qbIds = req.body.qbIds;
  if (userId && qbIds) {
    _qBankBookMarkServer2.default.find({
      user: userId,
      qBank: {
        "$in": qbIds
      }
    }).exec(function (err, qb) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong', err: err });
      } else {
        console.log(qb);
        return res.json({
          success: true,
          message: 'Fetched BookMarked Question Banks',
          qb: qb
        });
      }
    });
  }
};

var removeBookMark = exports.removeBookMark = function removeBookMark(req, res, next) {
  console.log('removeBookMark: ' + JSON.stringify(req.body));
  var userId = req.body.userId;
  var qbId = req.body.qbId;
  if (userId && qbId) {
    _qBankBookMarkServer2.default.findOneAndRemove({
      user: userId,
      qBank: qbId
    }, function (err, qb) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong' });
      } else {
        if (qb) {
          req.qbBm = qb;
          next();
        } else {
          return res.json({ success: false, message: 'Question Bank Not Found' });
        }
      }
    });
  }
};
//# sourceMappingURL=qBankBookMark.server.controller.js.map