// ./user-expressjs-backend/controllers/course.server.controller.js
import multer from 'multer';
import User from '../models/user.server.model';
import Course from '../models/course.server.model';
import Video from '../models/video.server.model';
import elasticClient from '../config/esSearchConfig';
const esClient = elasticClient;

//set multer storage
var storage = multer.diskStorage({
    destination:(req,file,cb) => {
      cb(null,'./public/courseImages');
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
  }).single('image');
  

class CourseCtrl {
   async addCourse (req, res, next) {
       console.log('addCourse: '+ JSON.stringify(req.body));
       try {
           let newCourse = new Course(req.body);
            let course =  await newCourse.save();
            if (course && course.videos.length > 0) {
                req.course = course;
                next();
            } else {
                let result = {
                    success:true,
                    message:'Course Added Successfully',
                    course
                  }
                 return  res.json(result);
            }
       } catch (error) {
          return res.json({
          success:false,
          message:error.message,
        });
       }
   }

   async getCourses (req, res, next) {
       console.log('getCourses: '+ JSON.stringify(req.params));
       try {
           if (!req.params.page && !req.params.limit) {
            throw new Error('Page & limit required');
           }
           let page = parseInt(req.params.page);
           let limit = parseInt(req.params.limit) < 30 ? parseInt(req.params.limit) : 30;
           let skipValue = (page * limit) - limit;
           let courses = await Course.find()
                                     .limit(limit)
                                     .skip(skipValue);
           let result = {
                success:true,
                message:'Courses Fetched Successfully',
                courses
             };
           return  res.json(result);
       } catch (error) {
        return res.json({
            success:false,
            message:error.message,
          });
       }
   }

   async editCourse(req, res, next){
       console.log('editCourse: '+ JSON.stringify(req.body));
       try {
           let id = req.body.id;
           if (!id) {
               throw new Error('Id required');
           }
           let course = await Course.findByIdAndUpdate(id, req.body, { new:true });
           let result = {
                success:true,
                message:'Course Updated Successfully',
                course
         };
         return res.json(result);
       } catch (error) {
        return res.json({
            success:false,
            message:error.message,
          });
       }
   }

   async getCourse (req, res, next) {
    console.log('getCourse: '+ JSON.stringify(req.params));
    try {
        if (!req.params.id) {
         throw new Error('Id required');
        }
        let id = req.params.id;
        let course = await Course.findOne({ _id:id });
        let result = {
             success:true,
             message:'Course Fetched Successfully',
             course
          };
        return  res.json(result);
    } catch (error) {
     return res.json({
         success:false,
         message:error.message,
       });
    }
 }

 async deleteCourse (req, res, next) {
    console.log('deleteCourse: '+ JSON.stringify(req.params));
    try {
        if (!req.params.id) {
         throw new Error('Id required');
        }
        let id = req.params.id;
        let course = await Course.findByIdAndRemove(id);
        let result = {
             success:true,
             message:'Course Deleted Successfully',
             course
          };
        return  res.json(result);
    } catch (error) {
     return res.json({
         success:false,
         message:error.message,
       });
    }
 }

 UploadImage(req,res,next) {
    Upload(req,res,(err) => {
           if(err){
             console.log('ERROR:'+err);
             return res.json({'success':false,'message':err});
           }
           else{
             req.result = {
               success:true,
               message:'Image Uploaded Successfully',
               file:req.file
             }
             next();
           }
  });
  }
  
  getResult(req,res,next){
      if(req.result){
        return res.json(req.result);
      } else {
        return res.json({
            success:false,
            message:'No Result Found',
          });
      }
  }

}

export default CourseCtrl;

