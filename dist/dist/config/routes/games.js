'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _game_controller = require('../../app/controllers/game_controller');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = new _express.Router();

router.use(_bodyParser2.default.json());

router.route('/').get(_game_controller.index).post(_game_controller.create);

router.route('/:id').get(_game_controller.show).put(_game_controller.update).delete(_game_controller.destroy);

exports.default = router;
//# sourceMappingURL=games.js.map
//# sourceMappingURL=games.js.map