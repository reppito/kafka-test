/**
 * Interface for Kafka message structure
 */
export interface Message<T = unknown> {
  // Unique identifier for the message
  id: string;
  
  // Type of the message for categorization
  type: string;
  
  // Main content of the message
  content: string;
  
  // Timestamp when the message was created
  timestamp: number;
  
  // Optional additional data
  metadata?: Record<string, unknown>;
  
  // The actual data payload (for generic usage)
  payload?: T;
}

/**
 * Kafka configuration interface
 */
export interface KafkaConfig {
  // The client ID used to identify this client
  clientId: string;
  
  // The comma-separated list of Kafka broker addresses
  brokers: string[];
  
  // The default topic to produce to or consume from
  topic: string;
  
  // The consumer group ID for Kafka consumers
  groupId?: string;
}

/**
 * Producer response interface
 */
export interface ProducerResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}
