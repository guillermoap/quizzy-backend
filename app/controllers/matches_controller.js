import Match from '../models/match';
import {
  matchIndex,
  matchShow
} from '../views/matches_view';

export const index = (req, res, next) => {
  Match.find().lean().exec((err, matches) => {
    res.json(matchIndex(matches));
  });
};

export const show = (req, res, next) => {
  Match.findOne({
    'url': req.params.url
  }).lean().exec((err, match) => {
    if (err) {
      return res.status(400)
        .json({
          error: errorMessage(err.message)
        });
    } else {
      if (match == null) {
        return res.status(404)
          .json({});
      } else {
        res.json(matchShow(match));
      }
    }
  });
}

export const create = (req, res, next) => {
  Match.create(req.body.match, function(err, match) {
    if (err) {
      return res.status(400)
        .json({
          error: errorMessage(err.message)
        });
    } else {
      return res.json({});
    }
  });
}

export const update = (req, res, next) => {
  Match.findByIdAndUpdate(req.params.id, {
    $set: req.body.match
  }, {
    new: true
  }).exec((err, match) => {
    if (err) {
      return res.status(400)
        .json({
          error: errorMessage(err.message)
        });
    } else {
      return res.json(matchShow(match));
    }
  });
}

export const destroy = (req, res, next) => {
  Match.findByIdAndRemove(req.params.id).exec((err, match) => {
    if (err) {
      return res.status(400)
        .json({
          error: errorMessage(err.message)
        });
    } else {
      return res.json({});
    }
  });
}

function errorMessage(error) {
  switch(error) {
    case (error.match(/url_1 dup key/) || {}).input:
      return ('THE URL ALREADY EXISTS');
    case (error.match(/you must enter a url/) || {}).input:
      return ('YOU MUST ENTER A URL');
    case (error.match(/invalid url/) || {}).input:
      return ('INVALID URL');
    case (error.match(/you must enter a type of match/) || {}).input:
      return ('YOU MUST ENTER A TYPE OF MATCH');
    case (error.match(/must have a owner/) || {}).input:
      return ('MUST HAVE A OWNER');
    case (error.match(/result must have a user/) || {}).input:
      return ('RESULT MUST HAVE A USER');
    case (error.match(/result must have a points/) || {}).input:
      return ('RESULT MUST HAVE A POINTS');
    case (error.match(/Cast to Date failed/) || {}).input:
      return ('INVALID DATE');
    case (error.match(/there must be a game/) || {}).input:
      return ('THERE MUST BE A GAME');
    case (error.match(/game: Validation failed:/) || {}).input:
      return ('ERROR IN THE DEFINITION OF THE GAME');
    default:
      return error
  }
}
