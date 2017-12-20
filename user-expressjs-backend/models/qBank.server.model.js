// ./user-expressjs-backend/models/qBank.server.model.js
import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const qBankSchema = new Schema({
  title:{
    type:String,
    required:[true, 'Title is required']
  },
  author:{
    type:Schema.ObjectId,
    ref:'User',
    required:[true, 'Author is required']
  },
  summary:{
    type:String,
    required:[true, 'Summary is required']
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{
    type:Date
  }
});

export default mongoose.model('qBank', qBankSchema);
