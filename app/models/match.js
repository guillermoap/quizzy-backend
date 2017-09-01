import mongoose, { Schema } from 'mongoose';

var matchSchema = new Schema ({
    // id : { 
    //     type: Number,
    //     unique: true
    // },
    isRealTime: Boolean,
    players: [String],
    owner: String,
    endingDate: Date,
    game: {
        // id : { type: Number, index: true },
        name: String,
        description: String,
        rating: Number,
        timesPlayed: Number,
        creator: String,
        questions: [String],
        tags: [String],
        // ranking : [(String, Number)],
        creationDate: Date,
        image: String
    },
    result: [Number]
})

class MatchClass {}

matchSchema.loadClass(MatchClass);

export default mongoose.model('Match', matchSchema);