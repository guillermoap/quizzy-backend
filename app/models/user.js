import mongoose, { Schema } from 'mongoose';

var userSchema = new Schema({
  nickname: {
    type : String,
    required: [true, 'you must enter a nickname'],
    unique: true,
    validate: {
      validator: function(nickname) { return !/\W/.test(nickname) },
      message: 'invalid nickname'
    }
  },
  email: {
    type : String,
    index: { unique: [true, 'this email already exists'] },
    required : [true, 'you must enter a email'],
    validate: {
      validator: function(email) { return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email) },
      message: 'invalid email'
    }
  },
  password : {
    type : String,
    required : [true, 'you must enter a password']
  }
});


class UserClass {
  debugger;
  static findByName(nickname, callback){
    return this.findOne({ nickname: nickname }, callback);
  }
}

userSchema.index({ nickname: 1, type: -1 }, { unique: true });

userSchema.loadClass(UserClass);

export default mongoose.model('User', userSchema);
