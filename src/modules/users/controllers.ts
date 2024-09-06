import assert from 'assert';
import type {Handler} from 'express';
import bcrypt from 'bcrypt';
import * as schemas from './schemas';
import * as services from './services';
import {SimpleError} from '../../utils/errors';
import {signAccessToken} from './helpers';

export const login: Handler = async (req, res) => {
  const data = schemas.login.parse(req.body);
  const user = await services._getUserByEmail(data.email);

  const loginFailureError = new SimpleError(400, req.t('loginFailure'));

  if (!user) {
    throw loginFailureError;
  }
  if (!bcrypt.compareSync(data.password, user.password)) {
    throw loginFailureError;
  }

  const accessToken = signAccessToken(user.id);
  const reshapedUser = services.shape(user);

  return res
    .status(200)
    .cookie('accessToken', accessToken, {path: '/', httpOnly: true})
    .cookie('user', JSON.stringify(reshapedUser), {path: '/'})
    .json({accessToken, user: reshapedUser});
};

export const signup: Handler = async (req, res) => {
  const data = await schemas.signupValidator(req, req.body);
  const user = await services.createUser(req, data);

  return res.status(200).json(user);
};

export const logout: Handler = async (req, res) => {
  assert(req.user);
  res.clearCookie('access-token');
  res.clearCookie('user');

  await services.setRevokeTokensBefore(req, req.user.id);
  const message = req.t('logoutSucceed');
  return res.json({message});
};

export const profile: Handler = async (req, res) => {
  assert(req.user);
  const user = await services.getUserById(req, req.user.id);

  return res.status(200).json(user);
};

export const changePassword: Handler = async (req, res) => {
  assert(req.user);
  const data = schemas.changePassword.parse(req.body);

  if (!bcrypt.compareSync(data.oldPassword, req.user.password)) {
    throw new SimpleError(400, req.t('oldPasswordIncorrect'));
  }

  const hashPassword = bcrypt.hashSync(data.newPassword, 10);
  await services.setPassword(req, req.user.id, hashPassword);

  const message = req.t('passwordUpdated');
  return res.status(200).json({message});
};
