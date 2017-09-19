'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questionSchema = new _mongoose.Schema({
  id: {
    type: Number,
    index: true
  },
  text: String,
  difficulty: String,
  answers: [String],
  correctAnswer: Number
});

module.exports = questionSchema;
//# sourceMappingURL=question.schema.js.map