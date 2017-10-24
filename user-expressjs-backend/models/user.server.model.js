import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
   fullName: {type: String},
   email: {
     type: String, required: true,
     trim: true, unique: true,
     match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
   },
   password: { type: String, required: true },
   facebookProvider: {
     type: {
       id: String,
       token: String
     },
     select: false
   },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

/**
 * The pre-save hook method.
 */
userSchema.pre('save', (next) =>{
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err,salt) => {
    //hash a password along with your new salt
    bcrypt.hash(user.password, salt, (err,hash) => {
      if(err) return next(err);

      //override the cleartext password with the hashed one
      user.password = hash;
      next();
    })
  })

  }
});


/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} cb
 */
userSchema.methods.comparePassword = (password,cb) => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if(err) return cb(err);
    cb(null, isMatch);
  })
}

export default mongoose.model('Todo', userSchema);
