import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
  id : {
    type: Number,
    index: true,
  },
  text : {
    type : String,
    required : [true, 'you must write the question'],
    validate : {
      validator:function(name){ return /\w/.test(name);},
      messager: 'you must write the question'
    }
  },
  difficulty : {
    type : String,
    enum : ['Easy', 'Medium', 'Hard'],/* 'difficulty can only be Easy, Medium or Hard'],*/
  },
  answers : {
    type : [String],
    required: [true, 'you must write the answers'],
    validate : {
      validator: function(answers){return answers.length == 4;},
      messager: 'There must be 4 possible answers'
    }
  },
  correctAnswer : {
    type : Number,
    required : [true, 'you must select correct answer'],
    min: [1, 'there must be a correct answer'],
    max: [4, 'there must be a correct answer'],
  }
})

module.exports = questionSchema;
