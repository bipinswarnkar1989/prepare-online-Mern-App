// ./user-expressjs-backend/index.js
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';
import config from './config/config';
import configureAuth from './config/configureAuth';
import passport from 'passport';

// import routes
import userRoutes from './routes/user.server.route';
import qBankRoutes from './routes/qBank.server.route';
import quesRoutes from './routes/question.server.route';
import qbBookmarkRoutes from './routes/qBankBookMark.server.route';

// define our app using express
const app = express();

// set the port
const port = process.env.PORT || 3001;

// middleware to allow-cors
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin", "Content-Type", "Authorization", "Content-Length", "X-Requested-With");
  next();
});

// configure the app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

//passport configuration
configureAuth(passport,app, config);


// connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/prepare-online-mern', {
  useMongoClient:true
});

// add Source Map Support
SourceMapSupport.install();

// connect to route
app.use('/api/user', userRoutes);
app.use('/api/qbank', qBankRoutes);
app.use('/api/question',quesRoutes);
app.use('/api/qbbookmark',qbBookmarkRoutes);

app.get('/login/facebook', passport.authenticate('facebook',{
  scope:'email'
}));

 app.get('/login/facebook/return',
   passport.authenticate('facebook', {
     //successRedirect:'http://localhost:3000/',
     failureRedirect: 'http://localhost:3000/login'
   }),
   function (req, res) {
     console.log('User: '+req.user);
     console.log('userToken: '+req.usertoken);
     res.header('Authorization', req.user);
     localStorage.setItem('userToken', req.user);
     res.redirect('http://localhost:3000/');
   }
 );

app.get('/', (req,res) => {
  return res.end('Api working');
})

// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

app.listen(port, () => {
  console.log(`App server is listening at ${port}`);
})
