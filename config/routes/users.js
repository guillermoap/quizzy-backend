import express, {
  Router
} from 'express';
import bodyParser from 'body-parser';

import {
  index,
  show,
  create,
  update,
  destroy,
  find,
  exists
} from '../../app/controllers/users_controller';

const router = Router();

router.use(bodyParser.json());

router.route('/')
  .get(index)
  .post(create)

router.route('/find/:name')
  .get(find)

router.route('/exists/:name')
  .get(exists)

router.route('/:id')
  .get(show)
  .put(update)
  .delete(destroy)

export default router;
