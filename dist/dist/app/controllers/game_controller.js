'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.create = exports.show = exports.index = undefined;

var _game = require('../models/game');

var _game2 = _interopRequireDefault(_game);

var _games_view = require('../views/games_view');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var index = exports.index = function index(req, res, next) {
  _game2.default.find().lean().exec(function (err, games) {
    if (err) {
      return res.status(400).json({
        error: err.errmsg
      });
    } else {
      res.json((0, _games_view.gameIndex)(games));
    }
  });
};

var show = exports.show = function show(req, res, next) {
  _game2.default.findById(req.params.id).lean().exec(function (err, game) {
    if (err) {
      return res.status(400).json({
        error: err.errmsg
      });
    } else {
      res.json((0, _games_view.gameShow)(game));
    }
  });
};

var create = exports.create = function create(req, res, next) {
  _game2.default.create(req.body.game, function (err, game) {
    if (err) {
      return res.status(400).json({
        error: err.errmsg
      });
    } else {
      return res.json({});
    }
  });
};

var update = exports.update = function update(req, res, next) {
  _game2.default.findByIdAndUpdate(req.params.id, {
    $set: req.body.game
  }, {
    new: true
  }).exec(function (err, game) {
    if (err) {
      return res.status(400).json({
        error: err.errmsg
      });
    } else {
      return res.json((0, _games_view.gameShow)(game));
    }
  });
};

var destroy = exports.destroy = function destroy(req, res, next) {
  _game2.default.findByIdAndRemove(req.params.id).exec(function (err, game) {
    if (err) {
      return res.status(400).json({
        error: err.errmsg
      });
    } else {
      return res.json({});
    }
  });
};
//# sourceMappingURL=game_controller.js.map
//# sourceMappingURL=game_controller.js.map