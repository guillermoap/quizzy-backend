import mongoose, { Schema } from 'mongoose';
import gameSchema from './schemas/game.schema';

var matchSchema = new Schema ({
  url: {
    type: String,
    unique: [true, 'this url already exists'],
    required: [true, 'you must enter a url'],
    validate: {
      validator: function(name){return !/\W/.test(name);},
      message: 'invalid url'          
    }
  },
  isRealTime: Boolean,
  players: {
    type : [String],
    required : [true, 'there must be at least one player'],
    validate : {
      validator: function(players){return players.length > 0;},
      messager: 'there must be at least one player'
    }
  },
  owner: {
    type : String,
    required : [true, 'must have a owner']
  },
  endingDate: Date,
  game: { 
    type: gameSchema,
    required: [true, 'there must be a game']
  },
  result: [Number]
})

class MatchClass {}

matchSchema.loadClass(MatchClass);

export default mongoose.model('Match', matchSchema);
