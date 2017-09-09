import mongoose, { Schema } from 'mongoose';

var userSchema = new Schema({
  nickname : {
    type : String,
    unique: true,
    required : true
  },
  email: {
    type : String,
    unique : true,
    required : true
  },
  password : {
    type : String,
    required : true
  },
});

class UserClass {}

userSchema.loadClass(UserClass);

export default mongoose.model('User', userSchema);
