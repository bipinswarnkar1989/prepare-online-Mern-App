// ./user-expressjs-backend/controllers/qBank.server.controller.js
import multer from 'multer';

import User from '../models/user.server.model';
import qBank from '../models/qBank.server.model';

//set multer storage
var storage = multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null,'./public/questionBankImages');
  },
  filename:(req,file,cb) => {
    let date = Date.now();
    let newImageName = file.originalname.split('.')[file.originalname.split('.').length - 2];
    newImageName = newImageName.replace(/ /g, '_');
    cb(null,file.fieldname + date + newImageName + '.' +file.originalname.split('.')[file.originalname.split('.').length -1] );
  }
});

var Upload = multer({
  storage:storage,
  fileFilter:(req,file,cb) => {
    console.log(file);
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/bmp'){
      cb(null,true);
    }
    else{
      cb(new Error('Only Image File Allowed'),false);
    }
  }
}).single('qBImage');

export const UploadImage = (req,res,next) => {
  Upload(req,res,(err) => {
         if(err){
           console.log('ERROR:'+err);
           return res.json({'success':false,'message':err});;
         }
         else{
           next();
         }
});
}

export const createQbank = (req,res,next) => {
  console.log(req.body);console.log('req.file:'+JSON.stringify(req.file));
  if(req.body){
    const newQbank = new qBank(req.body);
    if(req.file){
      newQbank.image = req.file.path;
    }
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

export const updateQbank = (req,res,next) => {
  let id = req.body.id
  console.log(req.body);console.log('req.file:'+JSON.stringify(req.file));
  if(req.body){
    if(req.file && req.file !== undefined && req.file !== 'undefined'){
      req.body.image = req.file.path;
    }
    qBank.findOneAndUpdate(
      { _id:id },
      { $set:req.body },
      { 'new':true }
    ).populate('author').exec((err,qb) => {
      if(err) {
           return res.json({success:false,message:'Something going wrong',err});
      }
      else{
        return res.json({
          success:true,
          message:'Question Bank Updated Successfully',
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

export const getqBankById = (req,res) => {
  let id = req.params.id;
  console.log('getqBankById: '+id);
  qBank.findOne({_id:id}).populate('author').exec((err,qb) => {
    if(err) {
      return res.json({success:false,message:'Something going wrong'});
    }
    else{
      if(qb){
        return res.json({success:true,message:'Question Bank Fetched Successfully',qb});
      }
      else{
        return res.json({success:false,message:'Question Banks Not Found'});
      }
    }
  })
}

export const deleteqBankById = (req,res) => {
  let id = req.params.id;
  console.log('deleteqBankById: '+id);
  if(id && id !== '' && id !== undefined){
    qBank.findByIdAndRemove(id,(err,qb) => {
      if(err) {
        return res.json({success:false,message:'Something going wrong'});
      }
      else{
        if(qb){
          return res.json({success:true,message:'Question Bank Deleted Successfully',qb});
        }
        else{
          return res.json({success:false,message:'Question Banks Not Found'});
        }
      }
    })
  }
}
