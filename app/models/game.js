import mongoose, { Schema } from 'mongoose';

gameSchema = new Schema({
  "id" : { type: Number, index: true },
  "name" : String,
  "description" : String,
  "rating" : Number,
  "timesPlayed" : Number,
  "creator" : String,
  "questions" : Array,
  "tags" : Array,
  "ranking" : Array,
  "creationDate" : Date,
  "image" : String	
})

class GameClass() {}

gameSchema.loadClass(UserClass);

export default mongoose.model('Game', gameSchema);