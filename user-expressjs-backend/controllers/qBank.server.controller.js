// ./user-expressjs-backend/controllers/qBank.server.controller.js
import multer from 'multer';

import User from '../models/user.server.model';
import qBank from '../models/qBank.server.model';
import Question from '../models/question.server.model';
import elasticClient from '../config/esSearchConfig';
const esClient = elasticClient;

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
  console.log('getAllQbanks: '+JSON.stringify(req.params));
  let page = parseInt(req.params.page);
  let limit = parseInt(req.params.limit);
  if(page && limit){
    limit = limit < 30 ? limit : 30;
    let skip_value = (page * limit) - limit;
    qBank.find().limit(limit).skip(skip_value).populate('author').exec((err,qb) => {
      if(err) {
        return res.json({success:false,message:'Something going wrong'});
      }
      else{
        console.log('count: '+req.count);
        return res.json({
          success:true,
          message:'Question Banks Fetched Successfully',
          count:req.count,
          qb
        });
      }
    })
  }
  else {
    return res.json({success:false,message:'Something going wrong'});
  }
}

export const countQbQuestions = (id) => {
  if(id){
   Question.count({qbank:id}).exec((err,count) => {
     return count;
   })
  }
 }

export const getqBankById = (req,res) => {
  let id = req.params.id;
  console.log('getqBankById: '+id);
  if(id){
    qBank.findOne({_id:id}).populate('author').exec((err,qb) => {
      if(err) {
        return res.json({success:false,message:'Something going wrong'});
      }
      else{
        if(qb){
          Question.count({qbank:id}).exec((err,count) => {
            return res.json({
              success:true,
              message:'Question Bank Fetched Successfully',
              noOfQuestions:count,
              qb
            });
          })
        }
        else{
          return res.json({success:false,message:'Question Banks Not Found'});
        }
      }
    })
  }
  else{
    return res.json({success:false,message:'Question Bank Id is required'});
  }
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

export const getLatestqBanks = (req,res) => {
  console.log('getLatestqBanks:');
  qBank.find().sort('-createdAt').populate('author').limit(3).exec((err,qb) => {
    if(err) {
      return res.json({success:false,message:'Something going wrong'});
    }
    else{
      return res.json({success:true,message:'Question Banks Fetched Successfully',qb});
    }
  })
}

export const countQbanks = (req,res,next) => {
  console.log('countQbanks: ');
  qBank.count().exec((err,count) => {
    if(err) {
      return res.json({success:false,message:'Something going wrong'});
    }
    else{
      req.count = count;
      next();
    }
  })
}

export const searchQbanks = (req,res) => {
  console.log('searchQbanks: '+ JSON.stringify(req.params));
  let q = req.params.q;
  let search = eval('/.*'+q+'.*/i');
  let regex = {$regex:search};
  if(q && q !== ''){
    qBank.find({$or:[{title:regex},{summary:regex}]})
         .limit(20)
         .exec((err,qb) => {
           if(err) {
             return res.json({success:false,message:'Something going wrong'});
           }
           else{
             if(!qb || qb === null){
               return res.json({success:true,message:'No Matches found'})
             }
             else{
               return res.json({success:true,message:'Question Banks Fetched Successfully',count:qb.length,qb});
             }
           }
         })
  }
  else{
    return res.json({success:false,message:'Enter text to search'});
  }
}

export const multipleDeleteQb = (req,res) => {
  console.log('multipleDeleteQb: '+ JSON.stringify(req.body));
  if(req.body){
    qBank.remove({ _id:{$in:req.body } }).exec((err) => {
      if(err) {
        return res.json({success:false,message:'Something going wrong',err});
      }
      else {
        return res.json({success:true,message:'Question Banks Deleted Successfully'});
      }
    })
  }
}


export const searchQbInEs = (req,res) => {
  console.log('searchQbInEs: '+ JSON.stringify(req.params));
  let input = req.params.q;
   if (input) {
    let rxp = '.*'+input+'.*';
    esClient.search({
      index:'',
      body:{
        "query": {
          "regexp": {
            "title": rxp
          }
        }
      }
    }).then(function (resp) {
      var hits = resp.hits.hits;console.log(JSON.stringify(resp));
      return res.json(resp);
  }, function (err) {
      console.trace(err.message);
  });
   }
} 
