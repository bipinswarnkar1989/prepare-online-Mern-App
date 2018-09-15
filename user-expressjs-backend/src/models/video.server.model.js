// ./user-expressjs-backend/models/course.server.model.js
import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

var Schema = mongoose.Schema;

const videoSchema = new Schema({
    course:{
       type:Schema.ObjectId,
       ref:'Course',
    },
    title:{
        type:String,
        es_indexed:true
    },
    author:{
        type:Schema.ObjectId,
        ref:'User',
        required:[true, 'Author is required']
    },
    description:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
      },
      updatedAt:{
        type:Date
      },
      videoAddress:{
          type:String,
          required:[true, 'Video Directory Address required']
      }
});

videoSchema.plugin(mongoosastic);

const videoModel = mongoose.model('Video', videoSchema);

export default videoModel;