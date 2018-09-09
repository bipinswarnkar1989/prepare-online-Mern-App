// ./user-expressjs-backend/controllers/video.server.controller.js
import multer from 'multer';
import User from '../models/user.server.model';
import Course from '../models/course.server.model';
import Video from '../models/video.server.model';
import elasticClient from '../config/esSearchConfig';
const esClient = elasticClient;

//set multer storage
var storage = multer.diskStorage({
    destination:(req,file,cb) => {
      cb(null,'./public/courseVideos');
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
      if(file.mimetype == 'video/x-flv' || file.mimetype == 'video/mp4' || file.mimetype == 'video/x-msvideo' || file.mimetype == 'video/x-ms-wmv' || file.mimetype == 'video/quicktime' || file.mimetype == 'video/3gpp' || file.mimetype == 'video/avi'){
        cb(null,true);
      }
      else{
        cb(new Error('Only Video File Allowed'),false);
      }
    }
  }).single('video');

class videoCtrl {
   async addVideo (req, res, next) {
    console.log('addVideo: '+ JSON.stringify(req.body));
    try {
        let newVideo = new Course(req.body);
        if(req.file){
            newVideo.videoAddress = req.file.path;
          }
         let video =  await newCourse.save();
         let result = {
             success:true,
             message:'Video Added Successfully',
             course
           }
         return  res.json(result);
    } catch (error) {
       return res.json({
       success:false,
       message:error.message,
     });
    }
   }

   async uploadVideo (req,res,next) {
    try {
        await Upload(req,res);
        next();
    } catch (error) {
        return res.json({
            success:false,
            message:error.message,
          });
    }
  }
}

export default videoCtrl;