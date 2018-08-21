'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema; // ./user-expressjs-backend/models/qBankBookMark.server.model.js


var qBankBookMarkSchema = new Schema({
  user: Schema.ObjectId,
  qBank: {
    type: Schema.ObjectId,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

exports.default = _mongoose2.default.model('qBankBookMark', qBankBookMarkSchema);
//# sourceMappingURL=qBankBookMark.server.model.js.map