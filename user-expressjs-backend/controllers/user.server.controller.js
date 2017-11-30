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
     expiresIn: 60 * 60 * 1 // expires in 1 hours
  },(err,token) => token);

  return token;
}

export const getUsers = (req,res) => {
  console.log('User: '+ JSON.stringify(req.user));
  return res.json({success:true, message:'Authenticated Successfully', user:req.user});
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
     password:req.body.password,
     profileType:'local'
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
       message:'Registered Successfully',
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

export const loginWithSocial = (req,res) => {console.log(req.body)
  if (req.body.email && req.body.id) {
    // Look up user by profile id
      var u;
      User.findOne({profileType: req.body.provider, profileId: req.body.id},(err,user) => {
        if(err) {
          return res.json({success:false,message:'Something going wrong'});
        }

        // Create a new user in the user table if not found
        if (!user) {
          var newUser = new User({
            fullName: req.body.name,
            email: req.body.email,
            profileId: req.body.id,
            profileType: req.body.provider,
            gender: req.body.gender,
            picture: `https://graph.facebook.com/${req.body.id}/picture?type=large`,
            password: req.body.id
          });

          newUser.save((err,user) => {
            if(err) {
                 return res.json({success:false,message:'Something going wrong'});
            }
            else{
              u =  user;
              var token = generateToken(u);
              return res.json({
                success:true,
                message:'Registered Successfully',
                token
              });
            }
          });

        }
        else{ //if user exists in database
          u = user;
          var token = generateToken(u);
          return res.json({
            success:true,
            message:'Registered Successfully',
            token
          });
        }

      });

  }
}

export const  findOrCreateFBUser = (profile,done) => {
        if (profile) {
          // Look up user by profile id
            var u;
            User.findOne({profileType: profile.provider, profileId: profile.id},(err,user) => {
              if(err) {
                return done(err);
              }

              // Create a new user in the user table if not found
              if (!user) {console.log(profile);
                var newUser = new User({
                  fullName: profile.displayName,
                  email: profile.emails[0].value,
                  profileId: profile.id,
                  profileType: profile.provider,
                  gender: profile.gender,
                  picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
                  password: '1234'
                });

                newUser.save((err,user) => {
                  if(err) {
                    return done(err);
                  }
                  else{
                    u =  user;
                    var token = generateToken(u);
                    return done(null,token);
                  }
                });

              }
              else{ //if user exists in database
                u = user;
                var token = generateToken(u);
                return done(null,token);
              }

            });

        }
      };
