import mongoose, { Schema } from 'mongoose';

var userSchema = new Schema({
  nickname : {
    type : String,
    unique: true,
    required : [true, 'you must enter a nikName']
  },
  email: {
    type : String,
    unique : true,
    required : [true, 'you must enter a email'],
    validate: {validator: function(email){ return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);},
               message: 'invalid email'          
    }
  },
  password : {
    type : String,
    required : [true, 'you must enter a password']
  },
});

class UserClass {}

userSchema.loadClass(UserClass);

export default mongoose.model('User', userSchema);
