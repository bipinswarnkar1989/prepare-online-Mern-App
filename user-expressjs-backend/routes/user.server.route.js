// ./user-expressjs-backend/routes/user.server.route.js
import express from 'express';

//import controller file
import * as userController from '../controllers/user.server.controller';

// get an instance of express router
const router = express.Router();

const routing = () => {
  router.route('/')
          .get(userController.getUsers)
        .route('/signup')
          .post(userController.registerUser)
        .route('/login')
          .post(userController.loginUser);


  return router;
}

export default routing;
