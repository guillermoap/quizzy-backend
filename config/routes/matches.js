import express, {
  Router
} from 'express';
import bodyParser from 'body-parser';

import {
  index,
  show,
  create,
  update,
  destroy
} from '../../app/controllers/matches_controller';

const router = Router();

router.use(bodyParser.json({ limit: '10mb' }));

router.route('/')
  .get(index)
  .post(create)

router.route('/:url')
  .get(show)

router.route('/:id')
  .put(update)
  .delete(destroy)

export default router;
