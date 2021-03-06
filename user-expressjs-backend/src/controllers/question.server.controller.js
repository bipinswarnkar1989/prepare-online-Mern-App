// ./user-expressjs-backend/controllers/question.server.controller.js
import User from '../models/user.server.model';
import qBank from '../models/qBank.server.model';
import Question from '../models/question.server.model';

export const createQuestion = (req,res,next) => {
  console.log('createQuestion: '+JSON.stringify(req.body));
  if(req.body.question && req.body.options){
    let newQuestion = new Question();
    newQuestion.question = req.body.question;
    newQuestion.author = req.body.author;
    newQuestion.qbank = req.body.qbank;
    newQuestion.save((err,ques) => {
      if(err) {
           console.log(err);
           return res.json({success:false,message:'Something going wrong',err});
      }
      else{
        if(ques){
          req.ques = ques;
          next();
        }else{
          return res.json({success:false,message:'Something going wrong'});
        }
      }
    })
  }else{
    return res.json({success:false,message:'Failed. Fill all fields.'});
  }
}

export const fetchQuestions = (req,res) => {
  console.log('fetchQuestions: '+JSON.stringify(req.params));
  let qBid = req.params.qBid || null;
  let page = parseInt(req.params.page) || null;
  let limit = parseInt(req.params.limit) || null;
  var last_skip_value = limit * (page - 1);
  if(qBid && page && limit){
     Question.find({qbank:qBid})
               .populate({
                 path:'options',
                 options: { limit:10 }
               })
               .limit(limit)
               .skip(last_skip_value)
               .exec((err,ques) => {
                 if(err) {
                      console.log(err);
                      return res.json({success:false,message:'Something going wrong',err});
                 }
                 else{
                   if(ques){
                     return res.json({
                       success:true,
                       message:'Questions Fetched Successfully',
                       count:req.count,
                       ques
                     });
                   }else{
                     return res.json({success:false,message:'Something going wrong'});
                   }
                 }
               })
  }
}

export const countQuestions = (req,res,next) => {
  let qBid = req.params.qBid || null;
  if (qBid) {
    Question.find({qbank:qBid}).count((err,count) => {
      if(err) {
        console.log(err);
        return res.json({success:false,message:'Something going wrong',err});
   }
   else{
     req.count = count;
     next();
   }
    })
  }
}

export const deleteQuestion = (req,res,next) => {
  console.log('deleteQuestion: '+JSON.stringify(req.params));
  let quesId = req.params.quesId;
  if(quesId){
    Question.findByIdAndRemove(quesId,(err,ques) => {
      if(err) {
           console.log(err);
           return res.json({success:false,message:'Something going wrong',err});
      }
      else{
        if(ques){console.log(ques)
             req.ques = ques;
             next();
        }else{
          return res.json({success:false,message:'Something going wrong'});
        }
      }
    })
  }
}

export const updateQuestion = (req,res) => {
  console.log('updateQuestion: '+JSON.stringify(req.body));
  if(req.body){
    let id = req.body._id;
    Question.findOneAndUpdate(
      { _id:id },
      { $set:req.body },
      { 'new':true }
    ).populate({
      path:'options',
      options: { limit:10 }
    }).exec((err,ques) => {
      if(err) {
           return res.json({success:false,message:'Something going wrong',err});
      }
      else{
        if(ques){
          return res.json({
            success:true,
            message:'Question Updated Successfully',
            ques
          });
        }
      }
    });
  }
}

