import type {Handler} from 'express';
import * as schemas from './schemas';
import * as services from './services';

export const signup: Handler = async (req, res) => {
  const data = await schemas.signupValidator(req, req.body);
  const user = await services.createUser(req, data);

  return res.status(200).json(user);
};
