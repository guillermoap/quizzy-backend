function errorMessageUser(error) {
  switch(error) {
    case (error.match(/email_1 dup key/) || {}).input:
      return ('The email already exists');
    case (error.match(/nickname_1 dup key/) || {}).input:
      return ('The nickname already exists');
    case (error.match(/you must enter a email/) || {}).input:
      return ('You must enter an email');
    case (error.match(/invalid email/) || {}).input:
      return ('Invalid email');
    case (error.match(/you must enter a nickname/) || {}).input:
      return ('You must enter a nickname');
    case (error.match(/invalid nickname/) || {}).input:
      return ('Invalid nickname');
    case (error.match(/you must enter a password/) || {}).input:
      return ('You must enter a password');
    case (error.match(/invalid password/) || {}).input:
      return ('Invalid password');
    default:
      return error
  }
}

export {
  errorMessageUser
}