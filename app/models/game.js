import mongoose, { Schema } from 'mongoose';
import questionSchema from './question';

var gameSchema = new Schema({
  id : { type: Number, index: true },
  name : String,
  description : String,
  rating : Number,
  timesPlayed : Number,
  creator : String,
  questions : [questionSchema],
  tags : [String],
  ranking : [{
  	user: String,
  	points: Number
  }],
  creationDate : Date,
  image : String
})

class GameClass {}

gameSchema.loadClass(GameClass);

export default mongoose.model('Game', gameSchema);
