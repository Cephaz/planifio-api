import express, {Application} from 'express';
import router from './modules';
import {translation} from './middleware';
import {errorHandler} from './utils/errors';
import {setZodErrors} from './middleware';

const app: Application = express();

// Parse incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Zod set error map middleware
app.use(setZodErrors());

// Set translation function
app.use(translation);

// Routers
app.use(router);

// Error handler
app.use(errorHandler);

export default app;
