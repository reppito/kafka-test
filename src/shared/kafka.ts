import { Kafka, Producer, Consumer, logLevel, EachMessagePayload } from 'kafkajs';
import { KafkaConfig, Message } from './types';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Default Kafka configuration from environment variables
const defaultConfig: KafkaConfig = {
  clientId: process.env.KAFKA_CLIENT_ID || 'kafka-experiment',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:29092').split(','),
  topic: process.env.KAFKA_TOPIC || 'messages-topic',
  groupId: process.env.KAFKA_GROUP_ID || 'kafka-experiment-group'
};

/**
 * Creates a Kafka client instance
 */
export const createKafkaClient = (config: Partial<KafkaConfig> = {}): Kafka => {
  const kafkaConfig: KafkaConfig = {
    ...defaultConfig,
    ...config
  };
  
  return new Kafka({
    clientId: kafkaConfig.clientId,
    brokers: kafkaConfig.brokers,
    logLevel: logLevel.INFO,
    retry: {
      initialRetryTime: 300,
      retries: 10
    }
  });
};

/**
 * Creates and connects a Kafka producer
 */
export const createProducer = async (config: Partial<KafkaConfig> = {}): Promise<Producer> => {
  const kafka = createKafkaClient(config);
  const producer = kafka.producer();
  
  try {
    await producer.connect();
    console.log('Producer connected to Kafka');
    return producer;
  } catch (error) {
    console.error('Failed to connect producer to Kafka:', error);
    throw error;
  }
};

/**
 * Creates and connects a Kafka consumer
 */
export const createConsumer = async (
  messageHandler: (message: Message) => Promise<void>,
  config: Partial<KafkaConfig> = {}
): Promise<Consumer> => {
  const kafkaConfig = { ...defaultConfig, ...config };
  const kafka = createKafkaClient(config);
  
  const consumer = kafka.consumer({ 
    groupId: kafkaConfig.groupId || 'kafka-experiment-group' 
  });
  
  try {
    await consumer.connect();
    console.log('Consumer connected to Kafka');
    
    await consumer.subscribe({ 
      topic: kafkaConfig.topic,
      fromBeginning: true
    });
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        try {
          if (message.value) {
            const messageValue = JSON.parse(message.value.toString());
            console.log(`Received message from topic ${topic}, partition ${partition}`);
            await messageHandler(messageValue);
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      }
    });
    
    return consumer;
  } catch (error) {
    console.error('Failed to connect consumer to Kafka:', error);
    throw error;
  }
};

/**
 * Utility function to create a message object
 */
export const createMessage = (
  content: string, 
  type: string = 'default',
  metadata?: Record<string, unknown>,
  payload?: unknown
): Message => {
  return {
    id: randomUUID(),
    type,
    content,
    timestamp: Date.now(),
    metadata,
    payload
  };
};

/**
 * Send a message to Kafka
 */
export const sendMessage = async (
  producer: Producer,
  message: Message,
  topic?: string
): Promise<void> => {
  const targetTopic = topic || defaultConfig.topic;
  
  try {
    await producer.send({
      topic: targetTopic,
      messages: [
        { 
          key: message.id, 
          value: JSON.stringify(message) 
        }
      ]
    });
    console.log(`Message sent to topic ${targetTopic}`);
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Safely disconnect a producer or consumer
 */
export const disconnect = async (client: Producer | Consumer): Promise<void> => {
  try {
    await client.disconnect();
    console.log('Disconnected from Kafka');
  } catch (error) {
    console.error('Error disconnecting from Kafka:', error);
  }
};

/**
 * Get topic from config or environment
 */
export const getTopic = (config?: Partial<KafkaConfig>): string => {
  return config?.topic || defaultConfig.topic;
};

// Handle process termination gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing Kafka connections');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing Kafka connections');
  process.exit(0);
});
