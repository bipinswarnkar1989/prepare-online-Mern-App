// ./user-expressjs-backend/controllers/question.server.controller.js
import User from '../models/user.server.model';
import qBank from '../models/qBank.server.model';
import Question from '../models/question.server.model';

export const createQuestion = (req,res) => {
  console.log('createQuestion: '+JSON.stringify(req.body));
  if(req.body){
    let newQuestion = new Question(req.body);
    newQuestion.save((err,ques) => {
      if(err) {
           console.log(err);
           return res.json({success:false,message:'Something going wrong',err});
      }
      else{
        if(ques){
          return res.json({
            success:true,
            message:'Question Added to Question Bank Successfully',
            ques
          });
        }else{
          return res.json({success:false,message:'Something going wrong'});
        }
      }
    })
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
                       ques
                     });
                   }else{
                     return res.json({success:false,message:'Something going wrong'});
                   }
                 }
               })
  }
}

export const deleteQuestion = (req,res) => {
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
          return res.json({
            success:true,
            message:'Question Delete Successfully',
            ques
          });
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
    ).exec((err,ques) => {
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

export const getCountQuestions = (req,res) => {
  console.log('getCountQuestions: '+JSON.stringify(req.params));
  let qbId = req.params.qbId;
  if(qbId){
    Question.count({qbank:qbId}).exec((err,count) => {
      if(err) {
        return res.json({success:false,message:'Something going wrong',err});
      }else if(count){
        return res.json({
          success:true,
          message:'Question Counted Successfully',
          count
        })
      }
    })
  }
}
