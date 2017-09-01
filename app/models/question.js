import mongoose, { Schema } from 'mongoose';

questionSchema = new Schema({
  id : { type: Number, index: true },
  text : String,
  difficulty : String,
  answers : [String],
  correctAnswer : Number,
})

module.exports = questionSchema;