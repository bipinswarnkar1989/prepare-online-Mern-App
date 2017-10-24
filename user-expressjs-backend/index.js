// ./user-expressjs-backend/index.js
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';

// import routes
import userRoutes from './routes/user.server.route';

// define our app using express
const app = express();

// set the port
const port = process.env.PORT || 3001;

// middleware to allow-cors
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type", "Authorization", "Content-Length", "X-Requested-With");
  //allow preflight
  if(req.method === "OPTIONS"){
    res.sendStatus(200);
  }
  else{
    next()
  }
  next();
});

// configure the app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));


// connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/prepare-online-mern', {
  useMongoClient:true
});

// add Source Map Support
SourceMapSupport.install();

// connect to route
app.use('/api/user', userRoutes);

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
