import mongoose, { Schema } from 'mongoose';
import questionSchema from './question.schema';

const gameSchema = new Schema({
  name : {
    type: String, 
    unique: true, 
    required: true,
    validate: {validator: function(name){ return !/\W/.test(name);},
               message: 'invalid url'          
    }
  },
  description : String,
  rating : {
    type : Number,
    min: [0, 'rating must be positive']
  },
  timesPlayed : {
    type : Number,
    min: [0, 'timesPlayed must be positive']
  },
  creator : {
    type: String, 
    required: [true, 'must have a creator']
  },
  questions : [questionSchema],
  tags : [String],
  ranking : [{
  	user: String,
  	points: Number
  }],
  creationDate : Date,
  image : String
})

module.exports = gameSchema;
