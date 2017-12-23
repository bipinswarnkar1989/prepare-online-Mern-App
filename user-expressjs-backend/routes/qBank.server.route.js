// ./user-expressjs-backend/routes/qBank.server.route.js
import express from 'express';

import * as qBankController from '../controllers/qBank.server.controller';

const router = express.Router();

router.route('/Qbanks')
  .get(qBankController.getAllQbanks)
  .post(qBankController.UploadImage,qBankController.createQbank)


export default router;
