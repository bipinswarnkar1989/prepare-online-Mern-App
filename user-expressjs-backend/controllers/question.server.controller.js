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
