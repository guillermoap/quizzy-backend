import mongoose, { Schema } from 'mongoose';

var userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String
});

class UserClass {}

userSchema.loadClass(UserClass);

export default mongoose.model('User', userSchema);
