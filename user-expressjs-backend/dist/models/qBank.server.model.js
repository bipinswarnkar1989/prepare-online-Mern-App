// ./user-expressjs-backend/models/qBank.server.model.js
import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

var Schema = mongoose.Schema;

const qBankSchema = new Schema({
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

qBankSchema.plugin(mongoosastic);

export default mongoose.model('qBank', qBankSchema);