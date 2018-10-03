// ./user-expressjs-backend/routes/course.server.route.js
import express from 'express';

import courseCtrl from '../controllers/course.server.controller';

const courseCtrlObj = new courseCtrl();

import videoCtrl from '../controllers/video.server.controller';

const videoCtrlObj = new videoCtrl();

const router = express.Router();

router.route('/')
      .post(courseCtrlObj.addCourse, videoCtrlObj.addCoursesInVideos)
      .put(courseCtrlObj.editCourse);
router.route('/:id')
      .get(courseCtrlObj.getCourse)
      .delete(courseCtrlObj.deleteCourse);
router.route('/:page/:limit')
      .get(courseCtrlObj.getCourses);
router.route('/uploadImage')
      .post(courseCtrlObj.UploadImage, courseCtrlObj.getCourses);


export default router;