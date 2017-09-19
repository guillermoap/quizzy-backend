'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var userSchema = new _mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: String
});

var UserClass = function UserClass() {
  _classCallCheck(this, UserClass);
};

userSchema.loadClass(UserClass);

exports.default = _mongoose2.default.model('User', userSchema);
//# sourceMappingURL=user.js.map