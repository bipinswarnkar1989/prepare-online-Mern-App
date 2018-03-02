// ./user-expressjs-backend/routes/quesOption.server.route.js
import express from 'express';

import optionController from '../controllers/quesOption.server.controller';
import * as userController from '../controllers/user.server.controller';

const opTionRouter = () => {
    const router = express.Router();
    const optCtrlObj = new optionController();
    router.route('/')
             .post(userController.authenticate,optCtrlObj.createOption);
    return router;
}

export default opTionRouter;