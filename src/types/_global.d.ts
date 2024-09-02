import {User as PrismaUser} from '@prisma/client';
import {TranslationFn} from '.';

declare global {
  namespace Express {
    type User = PrismaUser;

    interface Request {
      object: unknown;
      t: TranslationFn;
    }
  }
}
