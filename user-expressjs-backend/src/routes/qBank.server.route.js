// ./user-expressjs-backend/routes/qBank.server.route.js
import express from 'express';

import * as qBankController from '../controllers/qBank.server.controller';
import * as userController from '../controllers/user.server.controller';


const router = express.Router();

router.route('/Qbanks')
  .post(userController.authenticate,qBankController.UploadImage,qBankController.createQbank)
  .put(userController.authenticate,qBankController.UploadImage,qBankController.updateQbank);

router.route('/Qbanks/search/:q')
  .get(qBankController.searchQbanks);

router.route('/Qbanks/deleteMultipleQbanks')
  .post(qBankController.multipleDeleteQb);

router.route('/Qbanks/:page/:limit')
   .get(qBankController.countQbanks,qBankController.getAllQbanks);

router.route('/Qbank/latestQbanks')
    .get(qBankController.getLatestqBanks);

router.route('/Qbank/:id')
  .get(qBankController.getqBankById)
  .delete(userController.authenticate,qBankController.deleteqBankById);

router.route('/esSearch/:q')
   .get(qBankController.searchQbInEs);
  

export default router;
