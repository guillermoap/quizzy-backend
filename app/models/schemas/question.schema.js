import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
  id: {
    type: Number,
    index: true,
  },
  text: {
    type:  String,
    required: [true, 'you must write the question'],
    trim: true
  },
  hint: {
    type: String,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard']
  },
  answers: {
    type: [{
      answer: {
        type: String,
        trim: true,
        required: [true, 'answer can not be empty']
      }
    }],
    required: [true, 'you must write the answers'],
    validate: {
      validator: function(answers) { return (answers.length > 1 && answers.length < 7) },
      message: 'there must write between 2 and 6 possibles answers'
    }
  },
  correctAnswer: {
    type: Number,
    required: [true, 'you must select correct answer'],
    min: [0, 'there must be a correct answer'],
    validate: {
      validator: function(correctAnswer) { return (this.answers.length > correctAnswer) },
      message: 'there must be a correct answer'
    }
  }
})

module.exports = questionSchema;
