import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createRoutes } from './routes.js';
import { errorHandler } from './shared/utils/error-handler.util.js';
import { env } from './config/env.js';

export const app = express();

app.use(morgan('dev'));

// Enable CORS for the frontend origin
app.use(
  cors({
    origin: env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'PennyWise API is running',
  });
});

createRoutes(app);

app.use(errorHandler);
