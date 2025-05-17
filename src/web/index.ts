import dotenv from 'dotenv';
import { createServer, startServer } from './server';
import { createProducer, disconnect } from '../shared/kafka';
import { setProducer } from './routes';

// Load environment variables
dotenv.config();

// Get port from environment or use default
const PORT = parseInt(process.env.API_PORT || '3000', 10);

// Initialize and start the application
const start = async (): Promise<void> => {
  try {
    // Initialize Kafka producer
    const producer = await createProducer();
    console.log('Kafka producer initialized successfully');
    
    // Set producer for routes
    setProducer(producer);
    
    // Create and start web server
    const app = createServer();
    startServer(app, PORT);
    
    // Graceful shutdown handler
    const shutdown = async (): Promise<void> => {
      console.log('Shutting down producer API server...');
      if (producer) {
        await disconnect(producer);
      }
      process.exit(0);
    };

    // Handle termination signals
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
    
  } catch (error) {
    console.error('Failed to start service:', error);
    process.exit(1);
  }
};

// Start the application
start().catch(error => {
  console.error('Failed to start service:', error);
  process.exit(1);
}); 