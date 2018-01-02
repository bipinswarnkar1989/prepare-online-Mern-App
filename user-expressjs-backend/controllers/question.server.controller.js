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
