'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SALT_WORK_FACTOR = 10;

var Schema = _mongoose2.default.Schema;

var userSchema = new Schema({
  fullName: { type: String },
  email: {
    type: String, required: true,
    trim: true, unique: true,
    validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: { type: String, required: true },
  profileId: String,
  profileType: String,
  gender: String,
  picture: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  bookMarks: [{
    type: Schema.ObjectId,
    ref: 'qBankBookMark'
  }]
});

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

/**
 * The pre-save hook method.
 */
userSchema.pre('save', function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  _bcrypt2.default.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    //hash a password along with your new salt
    _bcrypt2.default.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      //override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} cb
 */
userSchema.methods.comparePassword = function (password, cb) {
  _bcrypt2.default.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.plugin(_mongooseUniqueValidator2.default, { message: 'is already taken' });

exports.default = _mongoose2.default.model('User', userSchema);
//# sourceMappingURL=user.server.model.js.map