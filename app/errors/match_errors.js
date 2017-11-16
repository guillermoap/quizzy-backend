function errorMessageMatch(error) {
  switch(error) {
    case (error.match(/url_1 dup key/) || {}).input:
      return ('The url already exists');
    case (error.match(/you must enter a url/) || {}).input:
      return ('You must enter a url');
    case (error.match(/invalid url/) || {}).input:
      return ('Invalid url');
    case (error.match(/you must enter a type of match/) || {}).input:
      return ('You must enter a type of match');
    case (error.match(/you must enter a state/) || {}).input:
      return ('you must enter a state');
    case (error.match(/must have a owner/) || {}).input:
      return ('Must have an owner');
    case (error.match(/result must have a user/) || {}).input:
      return ('Result must have a user');
    case (error.match(/result must have a points/) || {}).input:
      return ('Result must have points');
    case (error.match(/Cast to Date failed/) || {}).input:
      return ('Invalid date');
    case (error.match(/there must be a game/) || {}).input:
      return ('There must be a game');
    case (error.match(/game: Validation failed:/) || {}).input:
      return ('Error in the definition of the game');
    default:
      return error
  }
}

export {
  errorMessageMatch
}