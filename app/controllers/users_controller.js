import User from '../models/user';
import {
  userIndex,
  userShow
} from '../views/users_view';
import { errorMessageUser } from '../errors/user_errors';

export const index = (req, res, next) => {
  User.find().lean().exec((err, users) => {
    res.json(userIndex(users));
  });
};

export const show = (req, res, next) => {
  User.findById(req.params.id).lean().exec((err, user) => {
    if (err) {
      return res.status(404)
        .json({
          error: errorMessageUser(err.message)
        });
    }
    res.json(userShow(user));
  });
}

export const create = (req, res, next) => {
  User.create(req.body.user, function(err, user) {
    if (err) {
      return res.status(422)
        .json({
          error: errorMessageUser(err.message)
        });
    }
    return res.status(201)
      .json(userShow(user));
  });
}

export const update = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body.user
  }, {
    new: true
  }).exec((err, user) => {
    if (err) {
      return res.status(422)
        .json({
          error: errorMessageUser(err.message)
        });
    }
    return res.json(userShow(user));
  });
}

export const destroy = (req, res, next) => {
  User.findByIdAndRemove(req.params.id).exec((err, user) => {
    if (err) {
      return res.status(404)
        .json({
          error: errorMessageUser(err.message)
        });
    }
    return res.status(204).json({});
  });
}
