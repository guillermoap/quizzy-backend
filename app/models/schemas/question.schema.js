import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
  id : {
    type: Number,
    index: true,
  },
  text : {
    type : String,
    required : [true, 'you must write the question'],
  },
  difficulty : {
    type : String,
    enum : [['Easy', 'Medium', 'Hard'], 'difficulty can only be Easy, Medium or Hard'],
  },
  answers : {
    type : [String],
    validate : {validator: function(answer){
      return v.len = 4;
    }, messager: 'There must be 4 possible answers'
  }},
  correctAnswer : {
    type : Number,
    min: [1, 'there must be a correct answer'],
    max: [4, 'there must be a correct answer'],
  }
})

module.exports = questionSchema;
