import {Environment} from '../types';

const pe = process.env;

if (!pe.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set');
}

export const PORT = pe.PORT || 3000;
export const ENVIRONMENT = (pe.ENVIRONMENT as Environment) || 'production';
export const {DATABASE_URL} = pe;

// Client
export const CLIENT_PROTOCOL = pe.CLIENT_PROTOCOL || 'http';
export const CLIENT_DOMAIN = pe.CLIENT_DOMAIN || 'localhost:3000';
export const CLIENT_ORIGIN = `${CLIENT_PROTOCOL}://${CLIENT_DOMAIN}`;
