// ./user-expressjs-backend/controllers/course.server.controller.js
import User from '../models/user.server.model';
import Course from '../models/course.server.model';
import Video from '../models/video.server.model';
import elasticClient from '../config/esSearchConfig';
const esClient = elasticClient;

class CourseCtrl {
   async addCourse (req, res, next) {
       console.log('addCourse: '+ JSON.stringify(req.body));
       try {
           let newCourse = new Course(req.body);
            let course =  await newCourse.save();
            let result = {
                success:true,
                message:'Course Added Successfully',
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
}

export default CourseCtrl;

