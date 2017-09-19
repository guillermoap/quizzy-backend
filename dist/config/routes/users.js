'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _users_controller = require('../../app/controllers/users_controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.use(_bodyParser2.default.json());

router.route('/').get(_users_controller.index).post(_users_controller.create);

router.route('/:id').get(_users_controller.show).put(_users_controller.update).delete(_users_controller.destroy);

exports.default = router;
//# sourceMappingURL=users.js.map