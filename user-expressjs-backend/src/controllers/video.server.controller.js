// ./user-expressjs-backend/controllers/video.server.controller.js
import multer from 'multer';
import User from '../models/user.server.model';
import Course from '../models/course.server.model';
import Video from '../models/video.server.model';
import elasticClient from '../config/esSearchConfig';
import { triggerAsyncId } from 'async_hooks';
const esClient = elasticClient;

//set multer storage
var storage = multer.diskStorage({
    destination:(req,file,cb) => {
      cb(null, './public/courseVideos');
    },
    filename:(req,file,cb) => {
      let date = Date.now();
      let newImageName = file.originalname.split('.')[file.originalname.split('.').length - 2];
      newImageName = newImageName.replace(/ /g, '_');
      cb(null,file.fieldname + date + newImageName  + '.' +file.originalname.split('.')[file.originalname.split('.').length -1] );
    }
  });
  
  var Upload = multer({
    storage:storage,
    fileFilter:(req,file,cb) => {
      console.log(file);
      if(file.mimetype == 'video/x-flv' || file.mimetype == 'video/mp4' || file.mimetype === 'video/x-msvideo' || file.mimetype === 'video/x-ms-wmv' || file.mimetype === 'video/quicktime' || file.mimetype === 'video/3gpp' || file.mimetype === 'video/avi'){
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
        let newVideo = new Video(req.body);
        newVideo.createdAt = new Date();
        if(req.file){
            newVideo.videoAddress = req.file.path;
          }
         let video =  await newVideo.save();
         let result = {
             success:true,
             message:'Video Added Successfully',
             video
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
    Upload(req,res,(err) => {
      if(err){
        console.log('ERROR:'+err);
        return res.json({'success':false,'message':err});
      }
      else{
        next();
      }
    });
  }

  async updateVideo (req, res, next) {
    console.log('updateVideo: '+ JSON.stringify(req.body));
    if (req.body && req.body.id) {
       try {
         let id = req.body.id;
         let modifiedVideo = req.body;
         modifiedVideo.updatedAt = new Date();
         const video = await Video.findByIdAndUpdate(
           id,
           { $set:modifiedVideo },
           { new:true }
         );
         let result = {
          success:true,
          message:'Video Updated Successfully',
          video
        }
      return  res.json(result);
       } catch (error) {
        return res.json({
          success:false,
          message:error.message,
        });
       }
    }
  }

  async addCoursesInVideos (req, res, next) {
    console.log('addCoursesInVideos: '+ JSON.stringify(req.course));
    let course = req.course;
    if (course) {
       try {
         let id = course._id;
         let videoIds = course.videos;
        // modifiedVideo.updatedAt = new Date();
         const videos = await Video.update(
           {
             _id: { $in:videoIds }
           },
           { $set: { course:id } },
           { multi:true }
         );
         let result = {
          success:true,
          message:'Course Added in Videos Successfully',
          videos
        }
      return  res.json(result);
       } catch (error) {
        return res.json({
          success:false,
          message:error.message,
        });
       }
    }
  }

}

export default videoCtrl;