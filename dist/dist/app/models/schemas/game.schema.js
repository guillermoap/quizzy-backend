'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _question = require('./question.schema');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var gameSchema = new _mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  description: String,
  rating: Number,
  timesPlayed: Number,
  creator: String,
  questions: [_question2.default],
  tags: [String],
  ranking: [{
    user: String,
    points: Number
  }],
  creationDate: Date,
  image: String
});

module.exports = gameSchema;
//# sourceMappingURL=game.schema.js.map
//# sourceMappingURL=game.schema.js.map