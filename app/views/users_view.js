function userIndex(users) {
  return {
    users: users.map(user => ({
      nickname: user.nickname,
      id: user._id,
      email: user.email,
      pass: user.password
    }))
  }
}

function userShow(user) {
  return {
    user: {
      nickname: user.nickname, 
      id: user._id,
      email: user.email,
      pass: user.password
    }
  }
}

export {
  userIndex,
  userShow
}
