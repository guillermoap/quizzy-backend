'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('../../app/models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var users = [{
  email: 'ga@pis.com',
  password: '12345678'
}, {
  email: 'mi@pis.com',
  password: '12345678'
}, {
  email: 'bg@pis.com',
  password: '12345678'
}];

// Connect to MongoDB
_mongoose2.default.connect('mongodb://localhost/quizzy-backend');

// Go through each movie
users.map(function (data) {
  // Initialize a model with movie data
  var user = new _user2.default(data);
  // and save it into the database
  user.save();
});
//# sourceMappingURL=userPopulate.js.map
//# sourceMappingURL=userPopulate.js.map