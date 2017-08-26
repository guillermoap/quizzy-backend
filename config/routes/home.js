import {index} from '../../app/controllers/home_controller';

import {Router} from 'express';

const router = Router();

router.route('*')
  .all(index);

export default router;