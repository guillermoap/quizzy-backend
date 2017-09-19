'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _game = require('./schemas/game.schema');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var matchSchema = new _mongoose.Schema({
  url: {
    type: String,
    unique: true
  },
  isRealTime: Boolean,
  players: [String],
  owner: String,
  endingDate: Date,
  game: _game2.default,
  result: [Number]
});

var MatchClass = function MatchClass() {
  _classCallCheck(this, MatchClass);
};

matchSchema.loadClass(MatchClass);

exports.default = _mongoose2.default.model('Match', matchSchema);
//# sourceMappingURL=match.js.map