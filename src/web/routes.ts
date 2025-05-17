import { Router, Request, Response } from 'express';
import { Producer } from 'kafkajs';
import { createMessage, sendMessage } from '../shared/kafka';

// Type definition for message request body
interface MessageRequest {
  content: string;
  type?: string;
  metadata?: Record<string, unknown>;
  payload?: unknown;
}

export const apiRouter = Router();

// Store producer instance
let kafkaProducer: Producer | null = null;

export const setProducer = (producer: Producer): void => {
  kafkaProducer = producer;
};

// API endpoint to send messages to Kafka
apiRouter.post('/messages', async (req: Request, res: Response) => {
  try {
    if (!kafkaProducer) {
      res.status(503).json({
        success: false,
        error: 'Kafka producer not initialized'
      });
      return;
    }

    const { content, type = 'default', metadata = {}, payload = {} } = req.body as MessageRequest;
    
    // Validate request
    if (!content) {
      res.status(400).json({
        success: false,
        error: 'Content is required'
      });
      return;
    }
    
    // Create and send message to Kafka
    const message = createMessage(content, type, metadata, payload);
    await sendMessage(kafkaProducer, message);
    
    res.status(201).json({
      success: true,
      messageId: message.id
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Health check endpoint
apiRouter.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'healthy',
    kafka: kafkaProducer ? 'connected' : 'disconnected'
  });
}); 