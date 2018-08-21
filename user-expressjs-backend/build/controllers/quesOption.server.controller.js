'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // .user-expressjs-backend/controllers/quesOption.server.controller.js


var _quesOptionServer = require('../models/quesOption.server.model');

var _quesOptionServer2 = _interopRequireDefault(_quesOptionServer);

var _questionServer = require('../models/question.server.model');

var _questionServer2 = _interopRequireDefault(_questionServer);

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

var _esSearchConfig = require('../config/esSearchConfig');

var _esSearchConfig2 = _interopRequireDefault(_esSearchConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var esClient = _esSearchConfig2.default;

var quesOptionCtrl = function () {
  function quesOptionCtrl() {
    _classCallCheck(this, quesOptionCtrl);
  }

  _createClass(quesOptionCtrl, [{
    key: 'createOption',
    value: function createOption(req, res) {
      console.log('createOption: ' + JSON.stringify(req.body));
      if (req.body) {
        var Options = req.body.options;
        Options.forEach(function (element) {
          element.question = req.ques._id;
          return element;
        });
        _quesOptionServer2.default.insertMany(Options, function (err, opts) {
          if (err) {
            return res.json({ success: false, message: 'Something going wrong', err: err });
          } else {
            if (opts) {
              opts.forEach(function (el) {
                req.ques.options.push(el._id);
              });
              req.ques.save(function (err) {
                if (err) {
                  return res.json({ success: false, message: 'Something going wrong', err: err });
                } else {
                  return res.json({
                    success: true,
                    message: 'Question & Options Added to Question Bank Successfully',
                    ques: req.ques,
                    opts: opts
                  });
                }
              });
            }
          }
        });
      }
    }
  }, {
    key: 'updateOption',
    value: function updateOption(req, res, next) {
      console.log('upadateOption: ' + req.body.options);
      var optionsArray = req.body.options;
      var optionIds = optionsArray.map(function (item) {
        return item._id;
      });
      var optionValues = optionsArray.map(function (item) {
        return item.value;
      });
      console.log('optionIds: ' + JSON.stringify(optionIds));
      if (optionsArray) {
        optionsArray.forEach(function (element) {});
        _quesOptionServer2.default.update({
          _id: { $in: optionIds }
        }, {
          $set: { value: optionValues }
        }, {
          multi: true
        }).exec(function (err, opts) {
          if (err) {
            return res.json({ success: false, message: 'Something going wrong', err: err });
          } else {
            if (opts) {
              console.log('RESULT: ' + JSON.stringify(opts));
              next();
            }
          }
        });
      }
    }
  }, {
    key: 'deleteOptions',
    value: function deleteOptions(req, res, next) {
      console.log('deleteOptions: ' + req.ques.options);
      var options = req.ques.options;
      if (options) {
        _quesOptionServer2.default.find({
          _id: { $in: options }
        }).remove().exec(function (err, result) {
          if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Something going wrong', err: err });
          } else {
            console.log(result);
            return res.json({
              success: true,
              message: 'Question Delete Successfully',
              ques: req.ques
            });
          }
        });
      }
    }
  }]);

  return quesOptionCtrl;
}();

exports.default = quesOptionCtrl;
//# sourceMappingURL=quesOption.server.controller.js.map