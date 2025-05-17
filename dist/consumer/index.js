import { createConsumer, disconnect } from '../shared/kafka';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
// Create Kafka consumer instance
let consumer;
/**
 * Process message received from Kafka
 */
const processMessage = async (message) => {
    try {
        console.log('------------------------');
        console.log('Processing new message:');
        console.log(`ID: ${message.id}`);
        console.log(`Type: ${message.type}`);
        console.log(`Content: ${message.content}`);
        console.log(`Timestamp: ${new Date(message.timestamp).toISOString()}`);
        if (message.metadata) {
            console.log('Metadata:', message.metadata);
        }
        if (message.payload) {
            console.log('Payload:', message.payload);
        }
        // Here you would implement your actual message processing logic
        // e.g., store in database, call other services, etc.
        console.log('Message processed successfully');
        console.log('------------------------');
    }
    catch (error) {
        console.error('Error processing message:', error);
    }
};
// Initialize consumer
const initConsumer = async () => {
    try {
        consumer = await createConsumer(processMessage);
        console.log('Kafka consumer initialized and running');
        console.log(`Listening for messages on topic: ${process.env.KAFKA_TOPIC || 'messages-topic'}`);
    }
    catch (error) {
        console.error('Failed to initialize Kafka consumer:', error);
        process.exit(1);
    }
};
// Graceful shutdown
const shutdown = async () => {
    console.log('Shutting down consumer service...');
    if (consumer) {
        await disconnect(consumer);
    }
    process.exit(0);
};
// Handle termination signals
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
// Start the consumer
console.log('Starting Kafka consumer service...');
initConsumer().catch(error => {
    console.error('Failed to start consumer service:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map