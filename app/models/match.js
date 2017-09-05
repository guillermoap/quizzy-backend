import mongoose, {
  Schema
} from 'mongoose';
import gameSchema from './schemas/game.schema';

const matchSchema = new Schema({
  url: {
    type: String,
    unique: true
  },
  isRealTime: Boolean,
  players: [String],
  owner: String,
  endingDate: Date,
  game: gameSchema,
  result: [Number]
})

class MatchClass {}

matchSchema.loadClass(MatchClass);

export default mongoose.model('Match', matchSchema);