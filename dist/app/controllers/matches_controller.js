'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.create = exports.show = exports.index = undefined;

var _match = require('../models/match');

var _match2 = _interopRequireDefault(_match);

var _matches_view = require('../views/matches_view');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = exports.index = function index(req, res, next) {
  _match2.default.find().lean().exec(function (err, matches) {
    res.json((0, _matches_view.matchIndex)(matches));
  });
};

var show = exports.show = function show(req, res, next) {
  _match2.default.findOne({
    'url': req.params.url
  }).lean().exec(function (err, match) {
    if (err) {
      return res.status(400).json({
        error: err.errmsg
      });
    } else {
      if (match == null) {
        return res.status(404).json({});
      } else {
        res.json((0, _matches_view.matchShow)(match));
      }
    }
  });
};

var create = exports.create = function create(req, res, next) {
  _match2.default.create(req.body.match, function (err, match) {
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
  _match2.default.findByIdAndUpdate(req.params.id, {
    $set: req.body.match
  }, {
    new: true
  }).exec(function (err, match) {
    if (err) {
      return res.status(400).json({
        error: err.errmsg
      });
    } else {
      return res.json((0, _matches_view.matchShow)(match));
    }
  });
};

var destroy = exports.destroy = function destroy(req, res, next) {
  _match2.default.findByIdAndRemove(req.params.id).exec(function (err, match) {
    if (err) {
      return res.status(400).json({
        error: err.errmsg
      });
    } else {
      return res.json({});
    }
  });
};
//# sourceMappingURL=matches_controller.js.map