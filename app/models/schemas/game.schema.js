import mongoose, { Schema } from 'mongoose';
import questionSchema from './question.schema';

const gameSchema = new Schema({
  name : {
    type: String, 
    unique: [true, 'this name already exists'],
    required: [true, 'you must enter a name'],
    validate: {
      validator: function(name) { return !/\W/.test(name) },
      message: 'invalid name'          
    }
  },
  description : String,
  rating : {
    type : Number,
    min: [0, 'there must be a correct rating'],
    max: [5, 'there must be a correct rating']
  },
  timesPlayed : {
    type : Number,
    min: [0, 'timesPlayed must be positive']
  },
  creator : {
    type: String, 
    required: [true, 'must have a creator']
  },
  questions : {
    type: [questionSchema],
    required: [true, 'there must be at least one question']
  },
  tags : [String],
  ranking : [{
    user: {
      type:String,
      required: [true, 'ranking must have a user']
    },
    points : {
      type: Number,
      required: [true, 'ranking must have a points']
    }
  }],
  creationDate : Date,
  image : String
})
	
module.exports = gameSchema;
