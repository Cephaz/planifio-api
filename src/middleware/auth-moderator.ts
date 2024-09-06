import {NextFunction, Request, Response} from 'express';

const authorizeModerator = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user.role === 'ADMIN' || req.user.role === 'MODERATOR')) {
    next();
  } else {
    res.status(403).json({message: 'Access denied'});
  }
};

export default authorizeModerator;
