import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String
});

class UserClass {}

userSchema.loadClass(UserClass);

export default mongoose.model('User', userSchema);
