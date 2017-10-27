import Match from '../models/match';
import {
  matchIndex,
  matchShow
} from '../views/matches_view';
import { errorMessageMatch } from '../errors/match_errors';
import { rankingInsert } from '../functions/matches_functions';

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
      return res.status(422)
        .json({
          error: errorMessageMatch(err.message)
        });
    }
    if (match == null) {
      return res.status(404)
        .json();
    }
    res.json(matchShow(match));
  });
}

export const create = (req, res, next) => {
  Match.create(req.body.match, function(err, match) {
    if (err) {
      return res.status(422)
        .json({
          error: errorMessageMatch(err.message)
        });
    }
    return res.status(201)
      .json(matchShow(match));
  });
}

export const update = (req, res, next) => {
  if (req.body.match !== undefined) { 
    Match.findByIdAndUpdate(req.params.id, {
      $set: req.body.match
    }, {
      new: true
    }).exec((err, match) => {
      if (err) {
        return res.status(422)
          .json({
            error: errorMessageMatch(err.message)
          });
      }
      return res.json(matchShow(match));
    });
  } else if (req.body.user !== undefined && req.body.points !== undefined) {
    Match.findById(req.params.id, (err, match) => {
      let matchUpdate = rankingInsert(match, req.body.user, req.body.points)
      Match.update({ _id: req.params.id }, {
        $set: matchUpdate
      }, {
        new: true
      }).exec()
      return res.json({ ranking: matchUpdate.game.ranking });
    })
  } else {
    return res.status(404).json({})
  } 
}

export const destroy = (req, res, next) => {
  Match.findByIdAndRemove(req.params.id).exec((err, match) => {
    if (err) {
      return res.status(404)
        .json({
          error: errorMessageMatch(err.message)
        });
    }
    return res.status(204).json({});
  });
}
