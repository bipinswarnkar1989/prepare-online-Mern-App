// ./user-expressjs-backend/controllers/qBankBookMark.server.controller.js
import User from '../models/user.server.model';
import qBank from '../models/qBank.server.model';
import qBankBookMark from '../models/qBankBookMark.server.model';

export const createBookMark = (req,res,next) => {
  console.log('createBookMark: '+JSON.stringify(req.body));
  let userId = req.body.userId;
  let qbId = req.body.qbId;
  if(userId && qbId){
    const newQBankBookMark = new qBankBookMark({
      user:userId,
      qBank:qbId
    });
    newQBankBookMark.save((err,bm) => {
      if(err) {
           return res.json({success:false,message:'Something going wrong',err});
      }
      else{
        req.bm = bm;
        next();
      }
    });
  }
}

export const checkIsBookMarked = (req,res) => {
  console.log('checkIsBookMarked: '+JSON.stringify(req.body));
  let userId = req.body.userId;
  let qbIds = req.body.qbIds;
  if(userId && qbIds){
    qBankBookMark.find({
      user:userId,
      qBank:{
        "$in":qbIds
      }
    }).exec((err,qb) => {
      if(err) {
           return res.json({success:false,message:'Something going wrong',err});
      }
      else {
        console.log(qb)
        return res.json({
          success:true,
          message:'Fetched BookMarked Question Banks',
          qb
        });
      }
    })
  }
}

export const removeBookMark = (req,res,next) => {
  console.log('removeBookMark: '+JSON.stringify(req.body));
  let userId = req.body.userId;
  let qbId = req.body.qbId;
  if(userId && qbId){
    qBankBookMark.findOneAndRemove({
    user:userId,
    qBank:qbId
  },(err,qb) => {
      if(err) {
        return res.json({success:false,message:'Something going wrong'});
      }
      else{
        if(qb){
          req.qbBm = qb;
          next();
        }
        else{
          return res.json({success:false,message:'Question Bank Not Found'});
        }
      }
    })
  }
}
