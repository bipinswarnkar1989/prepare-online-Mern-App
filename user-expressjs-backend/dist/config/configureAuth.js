import { Strategy as FacebookStrategy } from 'passport-facebook';
import * as userController from '../controllers/user.server.controller';

const configureAuth = (passport, app, config) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  //Facebook Authentication
  passport.use(new FacebookStrategy({
    //pull in your app id and secret from your auth.js file
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL,
    profileFields: ['id', 'name', 'picture.type(large)', 'emails', 'displayName', 'about', 'gender']
  }, function (req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      const usertoken = userController.findOrCreateFBUser(profile, done);
      return usertoken;
    });
  }));
};

export default configureAuth;