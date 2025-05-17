import express from 'express';
import { json } from 'express';
import dotenv from 'dotenv';
import { apiRouter } from './routes';
// Load environment variables
dotenv.config();
export const createServer = () => {
    const app = express();
    // Middleware
    app.use(json());
    // Register routes
    app.use(apiRouter);
    return app;
};
export const startServer = (app, port) => {
    app.listen(port, () => {
        console.log(`API server running on port ${port}`);
    });
};
//# sourceMappingURL=server.js.map