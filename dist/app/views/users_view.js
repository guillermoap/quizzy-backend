"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function userIndex(users) {
  return {
    users: users.map(function (user) {
      return {
        id: user._id,
        email: user.email,
        pass: user.password
      };
    })
  };
}

function userShow(user) {
  return {
    user: {
      id: user._id,
      email: user.email,
      pass: user.password
    }
  };
}

exports.userIndex = userIndex;
exports.userShow = userShow;
//# sourceMappingURL=users_view.js.map