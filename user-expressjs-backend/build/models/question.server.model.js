'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema; // ./user-expressjs-backend/models/question.server.model.js


var questionSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  qbank: {
    type: Schema.ObjectId,
    ref: 'qBank',
    required: [true, 'Question bank is required']
  },
  question: {
    type: String,
    required: [true, 'Question cannot be left blank']
  },
  options: [{
    type: Schema.Types.ObjectId,
    ref: 'Option'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

exports.default = _mongoose2.default.model('Question', questionSchema);
//# sourceMappingURL=question.server.model.js.map