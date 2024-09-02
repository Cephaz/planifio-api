import {Router} from 'express';
import * as controllers from './controllers';

const router = Router();
router.post('/signup', controllers.signup);

export default router;
