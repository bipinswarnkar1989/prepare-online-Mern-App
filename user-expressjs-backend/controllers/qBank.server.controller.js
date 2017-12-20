// ./user-expressjs-backend/controllers/qBank.server.controller.js
import User from '../models/user.server.model';
import qBank from '../models/qBank.server.model';



export const createQbank = (req,res,next) => {
  console.log(req.body);
  if(req.body){
    const newQbank = new qBank(req.body);
    newQbank.save((err,qb) => {
      if(err) {
           return res.json({success:false,message:'Something going wrong',err});
      }
      else{
        return res.json({
          success:true,
          message:'Question Bank Added Successfully',
          qb
        });
      }
    });
  }
}

export const getAllQbanks = (req,res) => {
  qBank.find().populate('author').exec((err,qb) => {
    if(err) {
      return res.json({success:false,message:'Something going wrong'});
    }
    else{
      return res.json({success:true,message:'Question Banks Fetched Successfully',qb});
    }
  })
}
