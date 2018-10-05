// ./user-expressjs-backend/models/course.server.model.js
import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

var Schema = mongoose.Schema;

const courseSchema = new Schema({
    name:{
        type:String,
        required:[true, 'Course Title is required'],
        es_indexed:true
    },
    author:{
        type:Schema.ObjectId,
        ref:'User',
        required:[true, 'Author is required'],
        es_indexed:true
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
      ],
      image:String
});

courseSchema.plugin(mongoosastic);

const courseModel = mongoose.model('Course', courseSchema);

export default courseModel;