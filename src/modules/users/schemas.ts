import bcrypt from 'bcrypt';
import {Request} from 'express';
import {z} from 'zod';
import * as services from './services';

const fields = {
  email: z.string().email(),
  password: z.string().min(8).max(64),
};

export const login = z.object({
  email: z.string().max(128),
  password: z.string().max(128),
});

export const signup = z.object({
  email: fields.email,
  password: fields.password.transform((value) => bcrypt.hash(value, 12)),
});

export const signupValidator = (req: Request, body: unknown) => {
  const schema = signup.extend({
    email: signup.shape.email.refine(
      async (email) => {
        if (!email) {
          return true;
        }

        const user = await services._getUserByEmail(email);

        return !user;
      },
      {message: req.t('emailUsed')},
    ),
  });

  return schema.parseAsync(body);
};

export const changePassword = z.object({
  oldPassword: z.string(),
  newPassword: fields.password,
});

export type Login = z.infer<typeof login>;
export type Signup = z.infer<typeof signup>;
export type ChangePassword = z.infer<typeof changePassword>;
