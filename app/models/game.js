import mongoose, { Schema } from 'mongoose';
import questionSchema from './question';

const gameSchema = new Schema({
  name : {type: String, unique: true},
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
