'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.create = exports.show = exports.index = undefined;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _users_view = require('../views/users_view');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = exports.index = function index(req, res, next) {
  _user2.default.find().lean().exec(function (err, users) {
    res.json((0, _users_view.userIndex)(users));
  });
};

var show = exports.show = function show(req, res, next) {
  _user2.default.findById(req.params.id).lean().exec(function (err, user) {
    if (err) {
      return res.status(400).json({
        error: err.errmsg
      });
    } else {
      res.json((0, _users_view.userShow)(user));
    }
  });
};

var create = exports.create = function create(req, res, next) {
  _user2.default.create(req.body.user, function (err, user) {
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
  _user2.default.findByIdAndUpdate(req.params.id, {
    $set: req.body.user
  }, {
    new: true
  }).exec(function (err, user) {
    if (err) {
      return res.status(400).json({
        error: err.errmsg
      });
    } else {
      return res.json((0, _users_view.userShow)(user));
    }
  });
};

var destroy = exports.destroy = function destroy(req, res, next) {
  _user2.default.findByIdAndRemove(req.params.id).exec(function (err, user) {
    if (err) {
      return res.status(400).json({
        error: err.errmsg
      });
    } else {
      return res.json({});
    }
  });
};
//# sourceMappingURL=users_controller.js.map