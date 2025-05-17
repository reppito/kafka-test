import express, { Express } from 'express';
import { json } from 'express';
import dotenv from 'dotenv';
import { apiRouter } from './routes';

// Load environment variables
dotenv.config();

export const createServer = (): Express => {
  const app = express();
  
  // Middleware
  app.use(json());
  
  // Register routes
  app.use(apiRouter);
  
  return app;
};

export const startServer = (app: Express, port: number): void => {
  app.listen(port, () => {
    console.log(`API server running on port ${port}`);
  });
}; 