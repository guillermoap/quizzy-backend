import mongoose, { Schema } from 'mongoose';
import gameSchema from './schemas/game.schema';

var matchSchema = new Schema ({
  url: {
    type : String,
    required: [true, 'you must enter a url'],
    unique: true,
    lowercase: true,
    trim: true,
    validate : {
      validator: function(url) { return /^(\w|-)+$/.test(url)},
      message: 'invalid url'
    }
  },
  isRealTime: Boolean,
  players: {
    type : [String],
    required : [true, 'there must be at least one player'],
    validate : {
      validator: function(players) { return players.length > 0 },
      message: 'there must be at least one player'
    }
  },
  owner: {
    type : String,
    required : [true, 'must have a owner']
  },
  endingDate: { 
    type: Date,
    message: 'invalid date'
  },
  game: { 
    type: gameSchema,
    required: [true, 'there must be a game']
  },
  result: [Number]
})

class MatchClass {}

matchSchema.loadClass(MatchClass);

export default mongoose.model('Match', matchSchema);
