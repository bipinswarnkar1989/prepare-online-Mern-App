// ./user-expressjs-backend/routes/user.server.route.js
import express from 'express';
import passport from 'passport';

//import controller file
import * as userController from '../controllers/user.server.controller';

// get an instance of express router
const router = express.Router();


  router.get('/getuser', userController.authenticate, userController.getUsers);
  router.post('/signup',userController.registerUser);
  router.post('/signin',userController.loginUser);
  // router.get('/login/facebook',passport.authenticate('facebook'));
  // router.get('/login/facebook/return',
  //   passport.authenticate('facebook', {failureRedirect: 'http://localhost:3000/login'}),
  //   function (req, res) {
  //     res.redirect('http://localhost:3000/home');
  //   }
  // );

export default router;
