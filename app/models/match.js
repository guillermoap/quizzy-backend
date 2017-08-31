import mongoose, { Schema } from 'mongoose';

var matchSchema = new Schema ({
    id : { 
        type: Number,
        unique: true
    },
    isRealTime : Boolean,
    players : Array,
    owner : String,
    endingDate : Date,
    game : {
        id : { type: Number, index: true },
        name : String,
        description : String,
        rating : Number,
        timesPlayed : Number,
        creator : String,
        questions : Array,
        tags : [String],
        ranking : [(String, Number)],
        creationDate : Date,
        image : String
    },
    result : Array
})

class MatchClass {}

matchSchema.loadClass(MatchClass);

export default mongoose.model('Match', matchSchema);