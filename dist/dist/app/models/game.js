'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _game = require('./schemas/game.schema');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var GameClass = function GameClass() {
  _classCallCheck(this, GameClass);
};

_game2.default.loadClass(GameClass);

exports.default = _mongoose2.default.model('Game', _game2.default);
//# sourceMappingURL=game.js.map
//# sourceMappingURL=game.js.map