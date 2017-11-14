// ./user-expressjs-backend/routes/user.server.route.js
import express from 'express';

//import controller file
import * as userController from '../controllers/user.server.controller';

// get an instance of express router
const router = express.Router();


  router.get('/getuser', userController.authenticate, userController.getUsers);
  router.post('/signup',userController.registerUser);
  router.post('/signin',userController.loginUser);

export default router;
