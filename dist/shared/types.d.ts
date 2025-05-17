/**
 * Interface for Kafka message structure
 */
export interface Message<T = unknown> {
    id: string;
    type: string;
    content: string;
    timestamp: number;
    metadata?: Record<string, unknown>;
    payload?: T;
}
/**
 * Kafka configuration interface
 */
export interface KafkaConfig {
    clientId: string;
    brokers: string[];
    topic: string;
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
