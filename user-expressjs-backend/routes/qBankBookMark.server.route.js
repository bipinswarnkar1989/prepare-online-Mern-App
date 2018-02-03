// ./user-expressjs-backend/routes/qBankBookMark.server.route.js
import express from 'express';

import * as userController from '../controllers/user.server.controller';
import * as qbBookMarkController from '../controllers/qBankBookMark.server.controller';

const router = express.Router();

router.route('/qbBookmark')
        .post(userController.authenticate,qbBookMarkController.createBookMark);

router.route('/qbCheckBookmark')
        .post(qbBookMarkController.checkIsBookMarked);

export default router;
