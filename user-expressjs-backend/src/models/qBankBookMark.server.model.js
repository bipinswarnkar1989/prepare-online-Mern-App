// ./user-expressjs-backend/models/qBankBookMark.server.model.js
import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const qBankBookMarkSchema = new Schema({
  user:Schema.ObjectId,
  qBank:{
    type:Schema.ObjectId,
    unique:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

export default mongoose.model('qBankBookMark', qBankBookMarkSchema);
