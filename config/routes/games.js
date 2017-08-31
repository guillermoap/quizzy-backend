import { Router } from 'express';
import bodyParser from 'body-parser';

import { index, show, create, update, destroy } from '../../app/controllers/game_controller';


const router = new Router();

router.use(bodyParser.json());


router.route('/')
    .get(index)
    .post(create);

router.route('/:id')
    .get(show)
    .put(update)
    .delete(destroy);

export default router;