import _ from 'lodash';
import {Request} from 'express';
import * as schemas from './schemas';
import {UserShape} from './types';
import prisma from '../../prisma';
import {User} from '@prisma/client';

export const shape = (user: User): UserShape => {
  return {
    ..._.pick(user, ['id', 'email']),
  };
};

export const shapeNullable = (user: User | null): UserShape | null => {
  return user ? shape(user) : null;
};

export const _getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({where: {email}});

  return user;
};

export const createUser = async (req: Request, data: schemas.Signup): Promise<UserShape> => {
  const user = await prisma.user.create({data});

  return shape(user);
};

export const setRevokeTokensBefore = async (req: Request, id: string): Promise<UserShape | null> => {
  const user = await prisma.user.update({
    where: {id},
    data: {revokeTokensBefore: new Date()},
  });

  return shapeNullable(user);
};
