import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
  id : {
    type: Number,
    index: true,
  },
  text : {
    type : String,
    required : true,
  },
  difficulty : {
    type : String,
    enum : [['Easy', 'Medium', 'Hard'], 'hola'],
  },
  answers : {
    type : [String],
    validate : (v) => {
      return v.len = 4;
    },
  },
  correctAnswer : {
    type : Number,
    min: 1,
    max: 4,
  }
})

module.exports = questionSchema;
