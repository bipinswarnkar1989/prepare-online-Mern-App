// ./user-expressjs-backend/routes/qBank.server.route.js
import express from 'express';

import * as qBankController from '../controllers/qBank.server.controller';

const router = express.Router();

router.route('/Qbanks')
  .get(qBankController.getAllQbanks)
  .post(qBankController.UploadImage,qBankController.createQbank)
  .put(qBankController.UploadImage,qBankController.updateQbank);

router.route('/Qbank/:id')
  .get(qBankController.getqBankById)
  .delete(qBankController.deleteqBankById);


export default router;
