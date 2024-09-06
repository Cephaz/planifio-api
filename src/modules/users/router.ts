import {Router} from 'express';
import * as controllers from './controllers';
import {authenticate} from '../../middleware';

const router = Router();
router.post('/login', controllers.login);
router.post('/signup', controllers.signup);
router.post('/logout', authenticate(), controllers.logout);
router.get('/profile', authenticate(), controllers.profile);
router.post('/change-password', authenticate(), controllers.changePassword);

export default router;
