import mongoose, { Schema } from 'mongoose';
import questionSchema from './question.schema';

const gameSchema = new Schema({
  name : {
    type: String, 
    unique: [true, 'this name already exists'],
    lowercase: [true, 'duplicate name'],
    trim: true,
    required: [true, 'you must enter a name']
  },
  description: String,
  rating: {
    type: Number,
    min: [0, 'there must be a correct rating'],
    max: [5, 'there must be a correct rating']
  },
  creator: {
    type: String, 
    required: [true, 'must have a creator']
  },
  questions: {
    type: [questionSchema],
    required: [true, 'there must be at least one question'],
    validate: {
      validator: function(questions) { return (questions.length > 0 && questions.length < 31) },
      message: 'there must be between 1 and 30 possibles questions'
    }
  },
  tags: [String],
  ranking: [{
    user: {
      type:String,
      required: [true, 'ranking must have a user']
    },
    points: {
      type: Number,
      required: [true, 'ranking must have a points']
    }
  }],
  creationDate: Date,
  image: String
})
	
module.exports = gameSchema;
