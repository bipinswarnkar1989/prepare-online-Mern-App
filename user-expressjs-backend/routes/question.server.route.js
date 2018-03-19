// ./user-expressjs-backend/routes/question.server.route.js
import express from 'express';

import * as userController from '../controllers/user.server.controller';
import * as questionController from '../controllers/question.server.controller';
import quesOptionCtrl from '../controllers/quesOption.server.controller';
import * as qBankController from '../controllers/qBank.server.controller';

const quesOptionCtrlObj = new quesOptionCtrl();

const router = express.Router();

router.route('/question')
  .post(userController.authenticate,questionController.createQuestion,qBankController.addQuestoQb,quesOptionCtrlObj.createOption)
  .put(userController.authenticate,quesOptionCtrlObj.updateOption,questionController.updateQuestion);
router.route('/questions/:qBid/:page/:limit')
  .get(questionController.fetchQuestions);
router.route('/question/:quesId')
   .delete(userController.authenticate,questionController.deleteQuestion,quesOptionCtrlObj.deleteOptions);


export default router;
