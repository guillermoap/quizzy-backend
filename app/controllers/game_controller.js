import Game from '../models/game';
import {
  gameIndex,
  gameShow
} from '../views/games_view';

export const index = (req, res, next) => {
  Game.find().lean().exec((err, games) => {
    if (err) {
      return res.status(400)
        .json({
          error: errorMessage(err.message)
        });
    } else {
      res.json(gameIndex(games));
    }
  });
};

export const show = (req, res, next) => {
  Game.findById(req.params.id).lean().exec((err, game) => {
    if (err) {
      return res.status(404)
        .json({
          error: errorMessage(err.message)
        });
    } else {
      res.json(gameShow(game));
    }
  });
};

export const create = (req, res, next) => {
  Game.create(req.body.game, function(err, game) {
    if (err) {
      return res.status(500)
        .json({
          error: errorMessage(err.message)
        });
    } else {
      return res.json({});
    }
  });
};

export const update = (req, res, next) => {
  Game.findByIdAndUpdate(req.params.id, {
    $set: req.body.game
  }, {
    new: true
  }).exec((err, game) => {
    if (err) {
      return res.status(400)
        .json({
          error: errorMessage(err.message)
        });
    } else {
      return res.json(gameShow(game));
    }
  });
};

export const destroy = (req, res, next) => {
  Game.findByIdAndRemove(req.params.id).exec((err, game) => {
    if (err) {
      return res.status(400)
        .json({
          error: errorMessage(err.message)
        });
    } else {
      return res.json({});
    }
  });
};

function errorMessage(error) {
  switch(error) {
    case (error.match(/you must enter a name/) || {}).input:
      return ('You must enter a name');
    case (error.match(/name_1 dup key/) || {}).input:
      return ('The name already exists');
    case (error.match(/invalid name/) || {}).input:
      return ('Invalid name');
    case (error.match(/there must be a correct rating/) || {}).input:
      return ('There must be a correct rating');
    case (error.match(/must have a creator/) || {}).input:
      return ('Must have a creator');
    case (error.match(/ranking must have a user/) || {}).input:
      return ('Ranking must have a user');
    case (error.match(/ranking must have a points/) || {}).input:
      return ('Ranking must have points');
    case (error.match(/Cast to Date failed/) || {}).input:
      return ('Invalid date');
    case (error.match(/there must be at least one question/) || {}).input:
      return ('There must be at least one question');
    case (error.match(/question can not be empty/) || {}).input:
      return ('Question can not be empty');
    case (error.match(/Game validation failed: questions.0.difficulty:/) || {}).input:
      return ('Invalid difficluty');
    case (error.match(/you must write the answers/) || {}).input:
      return ('You must write the answers');
    case (error.match(/there must write between 2 and 6 possibles answers/) || {}).input:
      return ('The question must have between 2 and 6 possibles answers');
    case (error.match(/answer can not be empty/) || {}).input:
      return ('Answer can not be empty');
    case (error.match(/there must be a correct answer/) || {}).input:
      return ('There must be a correct answer');
    case (error.match(/you must select correct answer/) || {}).input:
      return ('You must select a correct answer');
    default:
      return error
  }
}