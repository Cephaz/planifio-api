import {Router} from 'express';
import * as controllers from './controllers';
import {authenticate} from '../../middleware';

const router = Router();
router.post('/login', controllers.login);
router.post('/signup', controllers.signup);
router.post('/logout', authenticate(), controllers.logout);

export default router;
