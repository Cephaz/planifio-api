import {Role} from '@prisma/client';

export interface UserShape {
  id: string;
  email: string;
  role: Role;
}
