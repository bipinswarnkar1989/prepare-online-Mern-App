'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosastic = require('mongoosastic');

var _mongoosastic2 = _interopRequireDefault(_mongoosastic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./user-expressjs-backend/models/quesOption.server.model.js
var Schema = _mongoose2.default.Schema;

var opTionSchema = new Schema({
    question: {
        type: Schema.ObjectId,
        ref: 'Question'
    },
    value: {
        type: String,
        required: [true, 'Why no option value'],
        es_indexed: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    number: {
        type: Number,
        required: [true, 'Why no option number']
    },
    answer: {
        type: Boolean
    }
});

opTionSchema.plugin(_mongoosastic2.default);

var Model = _mongoose2.default.model('Option', opTionSchema);
exports.default = Model;
//# sourceMappingURL=quesOption.server.model.js.map