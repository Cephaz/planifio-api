import {Environment} from '../types';

const pe = process.env;

if (!pe.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set');
}

export const PORT = pe.PORT || 3000;
export const ENVIRONMENT = (pe.ENVIRONMENT as Environment) || 'production';
export const {DATABASE_URL} = pe;
