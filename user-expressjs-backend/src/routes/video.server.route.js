// ./user-expressjs-backend/routes/video.server.route.js
import express from 'express';

import videoCtrl from '../controllers/video.server.controller';

const videoCtrlObj = new videoCtrl();

const router = express.Router();

router.route('/')
      .post(videoCtrlObj.uploadVideo, videoCtrlObj.addVideo);

export default router;