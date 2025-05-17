import { Producer } from 'kafkajs';
import { createProducer, disconnect } from '../shared/kafka';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Kafka producer instance
let producer: Producer;

// Initialize producer
const initProducer = async (): Promise<void> => {
  try {
    producer = await createProducer();
    console.log('Kafka producer initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Kafka producer:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const shutdown = async (): Promise<void> => {
  console.log('Shutting down producer...');
  
  if (producer) {
    await disconnect(producer);
  }
  
  process.exit(0);
};

// Handle termination signals
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Export producer instance and initialization function
export { producer, initProducer };
