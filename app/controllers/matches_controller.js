import Match from '../models/match';
import {
  matchIndex,
  matchShow,
  matchLanding
} from '../views/matches_view';
import { errorMessageMatch } from '../errors/match_errors';
import { rankingInsert } from '../functions/matches_functions';

export const index = (req, res, next) => {
  Match.find().lean().exec((err, matches) => {
    res.json(matchIndex(matches));
  });
};

export const show = (req, res, next) => {
  if (req.query.v === 'ranking'){
    Match.findById(req.params.url, (err, match) => {
      if (err) {
        return res.status(422)
          .json({
            error: errorMessageMatch(err.message)
          });
      } else if (match == null) {
        return res.status(404)
          .json();
      } else {
        return res.json(match.game.ranking);
      }
    })
  } else if (req.query.v === 'isReal'){
    Match.findById(req.params.url, (err, match) => {
      if (err) {
        Match.findOne({
          'url': req.params.url.toLowerCase().trim()
        }).lean().exec((err, match1) => {
          if (err) {
            return res.status(422)
              .json({
                error: errorMessageMatch(err.message)
              });
          }
          if (match1 == null) {
            return res.status(404)
              .json();
          }
          res.json(match1.isRealTime);
        });
      } else if (match == null) {
        return res.status(404)
          .json();
      } else {
        return res.json(match.isRealTime);
      }
    })
  } else {
    Match.findById(req.params.url, (err, match) => {
      if (err) {
        Match.findOne({
          'url': req.params.url.toLowerCase().trim()
        }).lean().exec((err, match1) => {
          if (err) {
            return res.status(422)
              .json({
                error: errorMessageMatch(err.message)
              });
          }
          if (match1 == null) {
            return res.status(404)
              .json();
          }
          res.json(matchShow(match1));
        });
      } else if (match == null) {
        return res.status(404)
          .json();
      } else {
        return (res.json(matchShow(match)))
      }
    })
  }
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
  if (req.body.match != null) {
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
  } else if (req.body.user != null && req.body.points != null) {
      Match.findById(req.params.id, (err, match) => {
      if (err) {
        return res.status(422)
          .json({
            error: errorMessageMatch(err.message)
          });
      } else {
        let matchUpdate = rankingInsert(match, req.body.user, req.body.points)
        Match.update({ _id: req.params.id }, {
          $set: matchUpdate
        }, {
          new: true
        }).exec()
        return res.json(matchUpdate.game.ranking);
      }
    })
  } else if (req.body.started != null) {
      Match.findById(req.params.id, (err, match) => {
      if (err) {
        return res.status(422)
          .json({
            error: errorMessageMatch(err.message)
          });
      } else {
        match.started = req.body.started;
        Match.update({ _id: req.params.id }, {
          $set: match
        }, {
          new: true
        }).exec()
        return res.json({});
      }
    })
  } else{
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

export const landing = (req, res, next) => {
  Match.find({ isRealTime: false }).lean().exec((err, matches) => {
    res.json(matchLanding(matches));
  });
};
