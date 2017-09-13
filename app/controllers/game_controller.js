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
          error: err.message
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
          error: err.message
        });
    } else {
      res.json(gameShow(game));
    }
  });
};

export const create = (req, res, next) => {
  Game.create(req.body.game, function(err, game) {
    if (err) {
      return res.status(400)
        .json({
          error: err.message
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
          error: err.message
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
          error: err.message
        });
    } else {
      return res.json({});
    }
  });
};
