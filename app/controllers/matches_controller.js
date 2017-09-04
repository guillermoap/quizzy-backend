import Match from '../models/match';
import { matchIndex, matchShow } from '../views/matches_view';

export const index = (req, res, next) => {
  Match.find().lean().exec((err, matches) => {
    if (err) {
      return res.json({ error: err.errmsg });
    } else {
      res.json(matchIndex(matches));
    }
  });
};

export const show = (req, res, next) => {
  Match.findOne({ 'url': req.params.id }).lean().exec((err, match) => {
    if (err) {
      return res.status(404)
        .json({ error: err.errmsg });
    } else {
      if ( match == null) {
          return res.status(404)
          .json({});
      } else {
        res.json(matchShow(match));
      }
    }
  });
}

export const create = (req, res, next) => {
  Match.create(req.body.match, function (err, match) {
    if (err) {
      return res.status(400)
        .json({ error: err.errmsg });
    } else {
      return res.json({});
    }
  });
}

export const update = (req, res, next)  => {
  Match.findByIdAndUpdate(req.params.id, { $set: req.body.match }, { new: true }).exec((err, match) => {
    if (err) {
      return res.status(400)
        .json({ error: err.errmsg });
    } else {
      return res.json(matchShow(match));
    }
  });
}

export const destroy = (req, res, next) => {
  Match.findByIdAndRemove(req.params.id).exec((err, match) => {
    if (err) {
      return res.status(400)
        .json({ error: err.errmsg });
    } else {
      return res.json({});
    }
  });
}
