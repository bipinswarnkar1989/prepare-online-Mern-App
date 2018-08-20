// ./user-expressjs-backend/models/quesOption.server.model.js
import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

var Schema = mongoose.Schema;

const opTionSchema = new Schema({
    question:{
        type:Schema.ObjectId,
        ref:'Question'
    },
    value:{
        type:String,
        required:[true,'Why no option value'],
        es_indexed:true
    },
    createdAt:{
        type:Date,
        default:Date.now
      },
      updatedAt:{
        type:Date
      },
      number:{
          type:Number,
          required:[true,'Why no option number']
      },
      answer:{
        type:Boolean
       },
});

opTionSchema.plugin(mongoosastic);

const Model = mongoose.model('Option', opTionSchema);
export default Model;