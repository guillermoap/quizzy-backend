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
      return ('YOU MUST ENTER A NAME');
    case (error.match(/name_1 dup key/) || {}).input:
      return ('THE NAME ALREADY EXISTS');
    case (error.match(/invalid name/) || {}).input:
      return ('INVALID NAME');
    case (error.match(/there must be a correct rating/) || {}).input:
      return ('THERE MUST BE A CORRECT RATING');
    case (error.match(/must have a creator/) || {}).input:
      return ('MUST HAVE A CREATOR');
    case (error.match(/ranking must have a user/) || {}).input:
      return ('RANKING MUST HAVE A USER');
    case (error.match(/ranking must have a points/) || {}).input:
      return ('RANKING MUST HAVE A POINTS');
    case (error.match(/Cast to Date failed/) || {}).input:
      return ('INVALID DATE');
    case (error.match(/there must be at least one question/) || {}).input:
      return ('THERE MUST BE AT LEAST ONE QUESTION');
    case (error.match(/question can not be empty/) || {}).input:
      return ('QUESTION CAN NOT BE EMPTY');
    case (error.match(/Game validation failed: questions.0.difficulty:/) || {}).input:
      return ('INVALID DIFFICLUTY');
    case (error.match(/you must write the answers/) || {}).input:
      return ('YOU MUST WRITE THE ANSWERS');
    case (error.match(/there must write between 2 and 6 possibles answers/) || {}).input:
      return ('THERE MUST WRITE BETWEEN 2 AND 6 POSSIBLES ANSWERS');
    case (error.match(/answer can not be empty/) || {}).input:
      return ('ANSWER CAN NOT BE EMPTY');
    case (error.match(/there must be a correct answer/) || {}).input:
      return ('THERE MUST BE A CORRECT ANSWER');
    case (error.match(/you must select correct answer/) || {}).input:
      return ('YOU MUST SELECT CORRECT ANSWER');
    default:
      return error
  }
}