import { Router } from 'express';
import { createMessage, sendMessage } from '../shared/kafka';
export const apiRouter = Router();
// Store producer instance
let kafkaProducer = null;
export const setProducer = (producer) => {
    kafkaProducer = producer;
};
// API endpoint to send messages to Kafka
apiRouter.post('/messages', async (req, res) => {
    try {
        if (!kafkaProducer) {
            res.status(503).json({
                success: false,
                error: 'Kafka producer not initialized'
            });
            return;
        }
        const { content, type = 'default', metadata = {}, payload = {} } = req.body;
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
    }
    catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
// Health check endpoint
apiRouter.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        kafka: kafkaProducer ? 'connected' : 'disconnected'
    });
});
//# sourceMappingURL=routes.js.map