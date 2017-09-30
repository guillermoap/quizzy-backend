import mongoose, { Schema } from 'mongoose';
import gameSchema from './schemas/game.schema';

var matchSchema = new Schema ({
  url: {
    type: String,
    required: [true, 'you must enter a url'],
    unique: true,
    lowercase: [true, 'duplicate url'],
    trim: true,
    validate: {
      validator: function(url) { return /^(\w|-)+$/.test(url) },
      message: 'invalid url'
    }
  },
  isRealTime: {
    type: Boolean,
    required: [true, 'you must enter a type of match']
  },
  owner: {
    type: String,
    required: [true, 'must have a owner']
  },
  endingDate: { 
    type: Date,
    message: 'invalid date'
  },
  game: { 
    type: gameSchema,
    required: [true, 'there must be a game']
  },
  result: [{
    user: {
      type:String,
      required: [true, 'result must have a user']
    },
    points: {
      type: Number,
      required: [true, 'result must have a points']
    }
  }],
})

class MatchClass {}

matchSchema.loadClass(MatchClass);

export default mongoose.model('Match', matchSchema);
