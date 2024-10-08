import {Environment} from '../types';

const pe = process.env;

if (!pe.SECRET_KEY || !pe.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set');
}

export const {SECRET_KEY, DATABASE_URL} = pe;

export const PORT = pe.PORT || 3000;

// development, test, production
export const ENVIRONMENT = (pe.ENVIRONMENT as Environment) || 'production';

export const JWT_ACCESS_TOKEN_LIFETIME = pe.JWT_ACCESS_TOKEN_LIFETIME || '1h';

// Client
export const CLIENT_PROTOCOL = pe.CLIENT_PROTOCOL || 'http';
export const CLIENT_DOMAIN = pe.CLIENT_DOMAIN || 'localhost:3000';
export const CLIENT_ORIGIN = `${CLIENT_PROTOCOL}://${CLIENT_DOMAIN}`;
