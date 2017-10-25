// ./user-expressjs-backend/controllers/user.server.controller.js
import jwt from 'jsonwebtoken';

//import models
import User from '../models/user.server.model';

var generateToken = user => {
  let u = {
    fullName: user.fullName,
    email:user.email,
    _id:user._id
  }
  const token = jwt.sign(u, 'my-secret', { algorithm: 'HS384' } ,{
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  },(err,token) => token);

  return token;
}

export const getUsers = (req,res) => {
  console.log('User: '+ JSON.stringify(req.user));
  return;
}


//middleware that checks if JWT token exists and verifies it if it does exist.
export const authenticate = (req,res,next) => {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if(!token){
    return res.status(401).json({
        success: false,
        message: 'Please Log in using a valid email & password'
      });
  }
  //token = token.replace('Bearer', '');
  jwt.verify(token, 'my-secret', (err,user) => {
    if(err){
      return res.status(401).json({
        success: false,
        message: 'Please Log in using a valid email & password'
      });
    } else {
      req.user = user;
      next();
    }
  })

}

export const registerUser = (req,res) => {
  console.log(req.body);
   var newUser = new User({
     fullName:req.body.fullname,
     email:req.body.email,
     password:req.body.password
   });
   newUser.save((err,user) => {
     if(err){
       if(err.name = 'validationError'){
         return res.json({success:false,message:'Email already taken'});
       }
       else{
         return res.json({success:false,message:'Something going wrong'});
       }
     }
     var token = generateToken(user);
     return res.json({
       success:true,
       token
     });
   })
}

export const loginUser = (req,res) => {
  if(!req.body.email || !req.body.password){
		res.json({ success: false, message: 'Please enter username and password'});
	}
   console.log(req.body.password);
   User.findOne({email:req.body.email}, (err,user) => {
     if(err){
       return res.json({success:false,message:'Something going wrong'});
     }
     if(!user){
        return res.json({success:false, message:'Invalid Email'});
     }
     else{
       user.comparePassword(req.body.password,(err,isMatch) => {
         if(!err && isMatch){
           var token = generateToken(user);
           return res.json({success:true, message:'Authenticated Successfully', user, token});
         }
         else{
           return res.json({success:false, message:'Invalid Password'});
         }
       });
     }
   })
}
