'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchQbInEs = exports.multipleDeleteQb = exports.searchQbanks = exports.countQbanks = exports.getLatestqBanks = exports.deleteqBankById = exports.getqBankById = exports.countQbQuestions = exports.getAllQbanks = exports.removeImage = exports.updateQbank = exports.addQuestoQb = exports.createQbank = exports.UploadImage = undefined;

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _userServer = require('../models/user.server.model');

var _userServer2 = _interopRequireDefault(_userServer);

var _qBankServer = require('../models/qBank.server.model');

var _qBankServer2 = _interopRequireDefault(_qBankServer);

var _questionServer = require('../models/question.server.model');

var _questionServer2 = _interopRequireDefault(_questionServer);

var _esSearchConfig = require('../config/esSearchConfig');

var _esSearchConfig2 = _interopRequireDefault(_esSearchConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./user-expressjs-backend/controllers/qBank.server.controller.js
var esClient = _esSearchConfig2.default;

//set multer storage
var storage = _multer2.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './public/questionBankImages');
  },
  filename: function filename(req, file, cb) {
    var date = Date.now();
    var newImageName = file.originalname.split('.')[file.originalname.split('.').length - 2];
    newImageName = newImageName.replace(/ /g, '_');
    cb(null, file.fieldname + date + newImageName + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

var Upload = (0, _multer2.default)({
  storage: storage,
  fileFilter: function fileFilter(req, file, cb) {
    console.log(file);
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/bmp') {
      cb(null, true);
    } else {
      cb(new Error('Only Image File Allowed'), false);
    }
  }
}).single('qBImage');

var UploadImage = exports.UploadImage = function UploadImage(req, res, next) {
  Upload(req, res, function (err) {
    if (err) {
      console.log('ERROR:' + err);
      return res.json({ 'success': false, 'message': err });
    } else {
      next();
    }
  });
};

var createQbank = exports.createQbank = function createQbank(req, res, next) {
  console.log(req.body);console.log('req.file:' + JSON.stringify(req.file));
  if (req.body) {
    var newQbank = new _qBankServer2.default(req.body);
    if (req.file) {
      newQbank.image = req.file.path;
    }
    newQbank.save(function (err, qb) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong', err: err });
      } else {
        return res.json({
          success: true,
          message: 'Question Bank Added Successfully',
          qb: qb
        });
      }
    });
  }
};

var addQuestoQb = exports.addQuestoQb = function addQuestoQb(req, res, next) {
  var quesId = req.ques._id;
  var qbId = req.ques.qbank;
  if (qbId && quesId) {
    _qBankServer2.default.update({ _id: qbId }, { $push: { questions: quesId } }).exec(function (err, qb) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong', err: err });
      } else {
        next();
      }
    });
  }
};

var updateQbank = exports.updateQbank = function updateQbank(req, res, next) {
  var id = req.body.id;
  console.log('updateQbank' + JSON.stringify(req.body));console.log('req.file:' + JSON.stringify(req.file));
  if (req.body) {
    if (req.body.image === "") {
      console.log('---REMOVE IMAGE STARTED---');
      removeImage(id);
    }
    if (req.file && req.file !== undefined && req.file !== 'undefined') {
      req.body.image = req.file.path;
      removeImage(id);
    }
    _qBankServer2.default.findOneAndUpdate({ _id: id }, { $set: req.body }, { 'new': true }).populate('author').exec(function (err, qb) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong', err: err });
      } else {
        return res.json({
          success: true,
          message: 'Question Bank Updated Successfully',
          qb: qb
        });
      }
    });
  }
};

var removeImage = exports.removeImage = function removeImage(id) {
  _qBankServer2.default.findOne({ _id: id }, 'image').exec(function (err, qb) {
    if (err) throw err;
    console.log('removeImage: ' + qb);
    _fs2.default.unlink(qb.image, function (err) {
      if (err) return;
      console.log(qb.image + ' was deleted');
    });
  });
};

var getAllQbanks = exports.getAllQbanks = function getAllQbanks(req, res) {
  console.log('getAllQbanks: ' + JSON.stringify(req.params));
  var page = parseInt(req.params.page);
  var limit = parseInt(req.params.limit);
  if (page && limit) {
    limit = limit < 30 ? limit : 30;
    var skip_value = page * limit - limit;
    _qBankServer2.default.find().limit(limit).skip(skip_value).populate('author').exec(function (err, qb) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong' });
      } else {
        console.log('count: ' + req.count);
        return res.json({
          success: true,
          message: 'Question Banks Fetched Successfully',
          count: req.count,
          qb: qb
        });
      }
    });
  } else {
    return res.json({ success: false, message: 'Something going wrong' });
  }
};

var countQbQuestions = exports.countQbQuestions = function countQbQuestions(id) {
  if (id) {
    _questionServer2.default.count({ qbank: id }).exec(function (err, count) {
      return count;
    });
  }
};

var getqBankById = exports.getqBankById = function getqBankById(req, res) {
  var id = req.params.id;
  console.log('getqBankById: ' + id);
  if (id) {
    _qBankServer2.default.findOne({ _id: id }).populate('author').exec(function (err, qb) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong' });
      } else {
        if (qb) {
          _questionServer2.default.count({ qbank: id }).exec(function (err, count) {
            return res.json({
              success: true,
              message: 'Question Bank Fetched Successfully',
              noOfQuestions: count,
              qb: qb
            });
          });
        } else {
          return res.json({ success: false, message: 'Question Banks Not Found' });
        }
      }
    });
  } else {
    return res.json({ success: false, message: 'Question Bank Id is required' });
  }
};

var deleteqBankById = exports.deleteqBankById = function deleteqBankById(req, res) {
  var id = req.params.id;
  console.log('deleteqBankById: ' + id);
  if (id && id !== '' && id !== undefined) {
    _qBankServer2.default.findByIdAndRemove(id, function (err, qb) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong' });
      } else {
        if (qb) {
          return res.json({ success: true, message: 'Question Bank Deleted Successfully', qb: qb });
        } else {
          return res.json({ success: false, message: 'Question Banks Not Found' });
        }
      }
    });
  }
};

var getLatestqBanks = exports.getLatestqBanks = function getLatestqBanks(req, res) {
  console.log('getLatestqBanks:');
  _qBankServer2.default.find().sort('-createdAt').populate('author').limit(3).exec(function (err, qb) {
    if (err) {
      return res.json({ success: false, message: 'Something going wrong' });
    } else {
      return res.json({ success: true, message: 'Question Banks Fetched Successfully', qb: qb });
    }
  });
};

var countQbanks = exports.countQbanks = function countQbanks(req, res, next) {
  console.log('countQbanks: ');
  _qBankServer2.default.count().exec(function (err, count) {
    if (err) {
      return res.json({ success: false, message: 'Something going wrong' });
    } else {
      req.count = count;
      next();
    }
  });
};

var searchQbanks = exports.searchQbanks = function searchQbanks(req, res) {
  console.log('searchQbanks: ' + JSON.stringify(req.params));
  var q = req.params.q;
  var search = eval('/.*' + q + '.*/i');
  var regex = { $regex: search };
  if (q && q !== '') {
    _qBankServer2.default.find({ $or: [{ title: regex }, { summary: regex }] }).limit(20).exec(function (err, qb) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong' });
      } else {
        if (!qb || qb === null) {
          return res.json({ success: true, message: 'No Matches found' });
        } else {
          return res.json({ success: true, message: 'Question Banks Fetched Successfully', count: qb.length, qb: qb });
        }
      }
    });
  } else {
    return res.json({ success: false, message: 'Enter text to search' });
  }
};

var multipleDeleteQb = exports.multipleDeleteQb = function multipleDeleteQb(req, res) {
  console.log('multipleDeleteQb: ' + JSON.stringify(req.body));
  if (req.body) {
    _qBankServer2.default.remove({ _id: { $in: req.body } }).exec(function (err) {
      if (err) {
        return res.json({ success: false, message: 'Something going wrong', err: err });
      } else {
        return res.json({ success: true, message: 'Question Banks Deleted Successfully' });
      }
    });
  }
};

var searchQbInEs = exports.searchQbInEs = function searchQbInEs(req, res) {
  console.log('searchQbInEs: ' + JSON.stringify(req.params));
  var input = req.params.q;
  if (input) {
    var rxp = '.*' + input + '.*';
    esClient.search({
      index: '',
      body: {
        "query": {
          "regexp": {
            "title": rxp
          }
        }
      }
    }).then(function (resp) {
      var hits = resp.hits.hits;console.log(JSON.stringify(resp));
      return res.json(resp);
    }, function (err) {
      console.trace(err.message);
    });
  }
};
//# sourceMappingURL=qBank.server.controller.js.map