import Game from '../models/game';
import {
  gameIndex,
  gameShow
} from '../views/games_view';
import { errorMessageGame } from '../errors/game_errors';

export const index = (req, res, next) => {
  Game.find().lean().exec((err, games) => {
    if (err) {
      return res.status(422)
        .json({
          error: errorMessageGame(err.message)
        });
    }
    res.json(gameIndex(games));
  });
};

export const show = (req, res, next) => {
  Game.findById(req.params.id).lean().exec((err, game) => {
    if (err) {
      if (req.params.id === null) {
        return res.status(404)
            .json({
              error: errorMessageGame(err.message)
            });
      } else {
        Game.findOne({
          'name': req.params.id.toLowerCase().trim()
        }).lean().exec((err, game1) => {
          if (err) {  
            return res.status(404)
            .json({
              error: errorMessageGame(err.message)
            });
          } else if (game1){
            return res.json(true);
          } else {
            return res.status(404).json(false);
          }
        })
      }
    } else {
      return res.json(gameShow(game));
    }
  });
};

export const create = (req, res, next) => {
  Game.create(req.body.game, function(err, game) {
    if (err) {
      return res.status(422)
        .json({
          error: errorMessageGame(err.message)
        });
    }
    return res.status(201)
      .json(gameShow(game));
  });
};

export const update = (req, res, next) => {
  Game.findByIdAndUpdate(req.params.id, {
    $set: req.body.game
  }, {
    new: true
  }).exec((err, game) => {
    if (err) {
      return res.status(422)
        .json({
          error: errorMessageGame(err.message)
        });
    }
    return res.json(gameShow(game));
  });
};

export const destroy = (req, res, next) => {
  Game.findByIdAndRemove(req.params.id).exec((err, game) => {
    if (err) {
      return res.status(404)
        .json({
          error: errorMessageGame(err.message)
        });
    }
    return res.status(204).json({});
  });
};
