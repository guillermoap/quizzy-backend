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
      return ('the url already exists');
    case (error.match(/you must enter a url/) || {}).input:
      return ("you must enter a url");
    case (error.match(/invalid url/) || {}).input:
      return ('invalid url');
    case (error.match(/you must enter a type of match/) || {}).input:
      return ('you must enter a type of match');
    case (error.match(/must have a owner/) || {}).input:
      return ('must have a owner');
    case (error.match(/result must have a user/) || {}).input:
      return ('result must have a user');
    case (error.match(/result must have a points/) || {}).input:
      return ('result must have a points');
    case (error.match(/Cast to Date failed/) || {}).input:
      return ('invalid Date');
    case (error.match(/there must be a game/) || {}).input:
      return ('there must be a game');
    case (error.match(/game: Validation failed:/) || {}).input:
      return ('error in the definition of the game');
    default:
      return error
  }
}
