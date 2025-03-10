const mongoose = require("mongoose");
const emailValidator = require("email-validator");


// SCHEMA + MODELS
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true, // allows multiple docs without this field
  },

  userName: {
    type: String,
    required: [true, "please enter a username"],
    unique: true,
    minlength: [3, "minimum length is 3 carachteres"],
  },

  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true],
    validate: {
      validator: function (v) {
        return emailValidator.validate(v);
      },
      message: "Please enter a valid email address",
    },
  },

  verificationToken: {
     type: String }, 

  verificationTokenExpires: {
     type: Date },

  password: {
    type: String,
    minlength: [6, "minimum password length is 6 characters"],
  },

  verification: {
    type: Boolean,
    default: false,
  },

  otp: { 
    type: String 
  }, 

  otpExpires: {
     type: Date
     } ,

  resetToken : {
    type:String
  } ,

  resetTokenExpire : {
    type: Date
  }

});

userSchema.index({ verificationTokenExpires: 1 }, { expireAfterSeconds: 0 });



const User = new mongoose.model("user", userSchema);

module.exports = User
