import {NextFunction, Request, Response} from 'express';

const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({message: 'Access denied'});
  }
};

export default authorizeAdmin;
