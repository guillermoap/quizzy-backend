import mongoose, { Schema } from 'mongoose';
import gameSchema from './schemas/game.schema'

class GameClass {}

gameSchema.loadClass(GameClass);

export default mongoose.model('Game', gameSchema);
