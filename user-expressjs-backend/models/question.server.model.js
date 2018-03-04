// ./user-expressjs-backend/models/question.server.model.js
import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const questionSchema = new Schema({
  author:{
    type:Schema.ObjectId,
    ref:'User',
    required:[true, 'Author is required']
  },
  qbank:{
    type:Schema.ObjectId,
    ref:'qBank',
    required:[true, 'Question bank is required']
  },
  question:{
    type:String,
    required:[true, 'Question cannot be left blank']
  },
  options:[
    {
    type:Schema.Types.ObjectId,
    ref:'Option'
    }
  ],
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now
  }
});

export default mongoose.model('Question', questionSchema);
