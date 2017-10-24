// ./user-expressjs-backend/routes/user.server.route.js
import express from 'express';

//import controller file
import * as userController from '../controllers/user.server.controller';

// get an instance of express router
const router = express.Router();


  router.route('/')
          .get(userController.getUsers);
  router.route('/signup')
          .post(userController.registerUser);
  router.route('/login')
          .post(userController.loginUser);

export default router;
