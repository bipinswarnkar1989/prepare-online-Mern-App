// ./user-expressjs-backend/models/course.server.model.js
import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

var Schema = mongoose.Schema;

const courseSchema = new Schema({
    title:{
        type:String,
        required:[true, 'Course Title is required']
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
      videos:[
        {
            type:Schema.ObjectId,
            ref:'Video'
        }
      ]
});

courseSchema.plugin(mongoosastic);

const courseModel = mongoose.model('Course', courseSchema);

export default courseModel;