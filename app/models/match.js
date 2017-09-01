import mongoose, { Schema } from 'mongoose';

var matchSchema = new Schema ({
    isRealTime: Boolean,
    players: [String],
    owner: String,
    endingDate: Date,
    game: {
        id : {
            type: Number,
            index: true
        },
        name: String,
        description: String,
        rating: Number,
        timesPlayed: Number,
        creator: String,
        questions: [{
            id: Number,
            difficulty: String,
            answers: Array,
            correctAnswer: Number
        }],
        tags: [String],
        ranking : [{
            nick: String,
            points: Number
        }],
        creationDate: Date,
        image: String
    },
    result: [Number]
})

class MatchClass {}

matchSchema.loadClass(MatchClass);

export default mongoose.model('Match', matchSchema);