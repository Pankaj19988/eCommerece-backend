const mongoose = require('mongoose');
const { Schema } = mongoose;

// fullname,email,mobile,password

const userSchema = new Schema({
  fullname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  mobile:{
    type:Number,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  term_condition:{
    type:Boolean,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
    }
  );

  const user =  mongoose.model('users',userSchema)
  // user.createIndexes()
  module.exports = user;