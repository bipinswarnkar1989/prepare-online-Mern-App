// ./user-expressjs-backend/routes/question.server.route.js
import express from 'express';

import * as userController from '../controllers/user.server.controller';
import * as questionController from '../controllers/question.server.controller';

const router = express.Router();

router.route('/question')
  .post(userController.authenticate,questionController.createQuestion);
router.route('/questions/:qBid/:page/:limit')
  .get(questionController.fetchQuestions)


export default router;
