function userIndex(users) {
  return { users: users.map(user => ({
    id: user._id,
    email: user.email,
    pass: user.password
  }))}
}

function userShow(user) {
  return { user: {
    id: user._id,
    email: user.email,
    pass: user.password
  }}
}

export { userIndex, userShow }
