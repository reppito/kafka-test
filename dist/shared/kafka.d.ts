import { Kafka, Producer, Consumer } from 'kafkajs';
import { KafkaConfig, Message } from './types.js';
/**
 * Creates a Kafka client instance
 */
export declare const createKafkaClient: (config?: Partial<KafkaConfig>) => Kafka;
/**
 * Creates and connects a Kafka producer
 */
export declare const createProducer: (config?: Partial<KafkaConfig>) => Promise<Producer>;
/**
 * Creates and connects a Kafka consumer
 */
export declare const createConsumer: (messageHandler: (message: Message) => Promise<void>, config?: Partial<KafkaConfig>) => Promise<Consumer>;
/**
 * Utility function to create a message object
 */
export declare const createMessage: (content: string, type?: string, metadata?: Record<string, unknown>, payload?: unknown) => Message;
/**
 * Send a message to Kafka
 */
export declare const sendMessage: (producer: Producer, message: Message, topic?: string) => Promise<void>;
/**
 * Safely disconnect a producer or consumer
 */
export declare const disconnect: (client: Producer | Consumer) => Promise<void>;
/**
 * Get topic from config or environment
 */
export declare const getTopic: (config?: Partial<KafkaConfig>) => string;
