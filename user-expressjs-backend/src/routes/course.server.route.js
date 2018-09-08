// ./user-expressjs-backend/routes/course.server.route.js
import express from 'express';

import courseCtrl from '../controllers/course.server.controller';

const courseCtrlObj = new courseCtrl();

const router = express.Router();

router.route('/')
      .post(courseCtrlObj.addCourse)
      .put(courseCtrlObj.editCourse);
router.route('/:id')
      .get(courseCtrlObj.getCourse)
      .delete(courseCtrlObj.deleteCourse);
router.route('/:page/:limit')
      .get(courseCtrlObj.getCourses);


export default router;