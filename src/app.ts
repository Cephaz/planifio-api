import express, {Application} from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import router from './modules';
import {translation} from './middleware';
import {errorHandler} from './utils/errors';
import {setZodErrors} from './middleware';
import {CLIENT_ORIGIN} from './utils/secrets';
import {secrets} from './utils';
import * as strategies from './utils/auth';

const app: Application = express();

app.use(
  cors({
    credentials: true,
    origin: CLIENT_ORIGIN,
  }),
);

// Security headers
app.use(helmet());

// Compress the response
app.use(compression());

// Parse incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Parse requests cookies
app.use(cookieParser(secrets.SECRET_KEY));

// Auth
app.use(passport.initialize());
passport.use('jwt', strategies.jwtStrategy);
passport.use('jwt-tolerant', strategies.jwtStrategyTolerant);

// Zod set error map middleware
app.use(setZodErrors());

// Set translation function
app.use(translation);

// Routers
app.use(router);

// Error handler
app.use(errorHandler);

export default app;
