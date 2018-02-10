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

export const removeBookMark = (req,res) => {
  console.log('removeBookMark: '+JSON.stringify(req.body));
  let userId = req.body.userId;
  let qbId = req.body.qbId;
  if(userId && qbIds){
    qBankBookMark.remove({
      user:userId,
      qBank:qbId
    }, true).exec((err,qb) => {
      if(err) {
           return res.json({success:false,message:'Something going wrong',err});
      }
      else {
        console.log(qb)
        return res.json({
          success:true,
          message:'BookMarked Removed',
          qb
        });
      }
    })
  }
}
