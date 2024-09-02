import type {Handler} from 'express';
import passport from 'passport';
import {User} from '@prisma/client';

interface AuthenticationParams {
  tolerant?: boolean;
}

const authenticate = ({tolerant = false}: AuthenticationParams = {}) => {
  const handler: Handler = (req, res, next) => {
    passport.authenticate(
      tolerant ? 'jwt-tolerant' : 'jwt',
      {session: false},
      (error: unknown, user: User, _info: unknown) => {
        if (error) {
          return res.status(500).json({
            detail: req.t('serverError'),
          });
        }

        if (!user && !tolerant) {
          return res.status(401).json({detail: req.t('authFailed')});
        }

        if (user) {
          req.user = user;
        }

        return next();
      },
    )(req, res, next);
  };

  return handler;
};

export default authenticate;
