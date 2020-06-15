const mongoose = require('mongoose')

const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const brugerSchema = new mongoose.Schema({
    brugernavn: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Email is required !'],
    trim:true,
    lowercase:true,
    index:{unique:true}
  },
  password: {
    type: String,
    required: true,
    trim:true,
    minlength:[3,'password need to be longer']
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now
  }
})


brugerSchema.pre('save', function (next) {
  var bruger = this;
  // hvis bruger er rettet men password ikke ændret så spring dette over ... next() betyder forlad denne middleware
  if (!bruger.isModified('password')) return next();
  //Generate a salt - Når brugerdata rettes - generate a password hash when the password changes (or a new password)
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err);
      // Combining Salt to Generate New Hash
      bcrypt.hash(bruger.password, salt, function (err, hash) {
          // hvis der er fejl så spring denne middleware over og tag fejlen med videre ...
          if (err) return next(err);
          // Overwriting plaintext passwords with hash
          bruger.password = hash;
          next();
      });
  });
});

brugerSchema.methods.comparePassword = function (indtastetPassword, cb) {
  bcrypt.compare(indtastetPassword, this.password, function (err, isMatch) {
   if (err) return cb(err);
   cb(null, isMatch);
   });
  };


module.exports = mongoose.model('Bruger', brugerSchema)