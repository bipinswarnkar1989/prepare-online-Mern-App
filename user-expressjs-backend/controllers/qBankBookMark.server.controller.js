// ./user-expressjs-backend/controllers/qBankBookMark.server.controller.js
import User from '../models/user.server.model';
import qBank from '../models/qBank.server.model';
import qBankBookMark from '../models/qBankBookMark.server.model';

export const createBookMark = (req,res) => {
  console.log('createBookMark: '+req.body);
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
        return res.json({
          success:true,
          message:'Question Bank BookMarked Successfully',
          bm
        });
      }
    });
  }
}

export const checkIsBookMarked = (req,res) => {
  console.log('checkIsBookMarked: '+req.body);
  let userId = req.body.userId;
  let qbId = req.body.qbId;
  if(userId && qbId){
    qBankBookMark.findOne({user:userId, qBank:qbId}).exec((err,bm) => {
      if(err) {
           return res.json({success:false,message:'Something going wrong',err});
      }
      else {
        if(bm){
          return res.json({
            success:true,
            message:'Question Bank BookMarked',
            bookmark:true,
            bm
          });
        }else {
          return res.json({
            success:true,
            message:'Question Bank Not BookMarked',
            bookmark:false,
          });
        }
      }
    })
  }
}
