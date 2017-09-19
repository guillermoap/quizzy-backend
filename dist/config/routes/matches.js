'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _matches_controller = require('../../app/controllers/matches_controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.use(_bodyParser2.default.json());

router.route('/').get(_matches_controller.index).post(_matches_controller.create);

router.route('/:url').get(_matches_controller.show);

router.route('/:id').put(_matches_controller.update).delete(_matches_controller.destroy);

exports.default = router;
//# sourceMappingURL=matches.js.map