// ./user-expressjs-backend/routes/qBank.server.route.js
import express from 'express';

import * as qBankController from '../controllers/qBank.server.controller';
import * as userController from '../controllers/user.server.controller';

const router = express.Router();

router.route('/Qbanks')
  .get(qBankController.getAllQbanks)
  .post(userController.authenticate,qBankController.UploadImage,qBankController.createQbank)
  .put(userController.authenticate,qBankController.UploadImage,qBankController.updateQbank);

router.route('/Qbank/:id')
  .get(qBankController.getqBankById)
  .delete(userController.authenticate,qBankController.deleteqBankById);


export default router;
