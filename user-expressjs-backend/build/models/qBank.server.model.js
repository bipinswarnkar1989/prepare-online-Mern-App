'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosastic = require('mongoosastic');

var _mongoosastic2 = _interopRequireDefault(_mongoosastic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./user-expressjs-backend/models/qBank.server.model.js
var Schema = _mongoose2.default.Schema;

var qBankSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  summary: {
    type: String,
    required: [true, 'Summary is required']
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  questions: [{
    type: Schema.ObjectId,
    ref: 'Question'
  }]
});

qBankSchema.plugin(_mongoosastic2.default);

exports.default = _mongoose2.default.model('qBank', qBankSchema);
//# sourceMappingURL=qBank.server.model.js.map