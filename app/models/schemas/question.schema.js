import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
  id : {
    type: Number,
    index: true,
  },
  text : {
    type : String,
    required : [true, 'you must write the question']
  },
  difficulty : {
    type : String,
    enum : ['Easy', 'Medium', 'Hard']
  },
  answers : {
    type : [String],
    required: [true, 'you must write the answers'],
    validate : {
      validator: function(answers) { return answers.length == 4 },
      message: 'there must be 4 possibles answers'
    }
  },
  correctAnswer : {
    type : Number,
    required : [true, 'you must select correct answer'],
    min: [1, 'there must be a correct answer'],
    max: [4, 'there must be a correct answer']
  }
})

module.exports = questionSchema;
