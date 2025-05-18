# Kafka Experiment

A Node.js application demonstrating Kafka integration with a web service, producer, and consumer.

## Prerequisites

- Docker and Docker Compose (for Kafka infrastructure)
- Node.js 20.x (for local development)
- npm (for local development)
- Visual Studio Code (for debugging)

## Quick Start

1. Clone the repository:
```bash
git clone <your-repository-url>
cd kafka-experiment
```

2. Create a `.env` file in the root directory with the following content:
```env
KAFKA_CLIENT_ID=kafka-experiment
KAFKA_BROKERS=localhost:29092
KAFKA_TOPIC=messages-topic
KAFKA_GROUP_ID=kafka-experiment-group
API_PORT=3000
```

3. Start Kafka infrastructure:
```bash
npm run compose:up
```

4. Install dependencies:
```bash
npm install
```

5. Build the TypeScript code:
```bash
npm run build
```

6. Start the Node.js application:
```bash
npm run start:all
```

The application will be available at:
- Web API: http://localhost:3000
- Kafka: localhost:29092
- Zookeeper: localhost:2181
- Kafdrop (Kafka UI): http://localhost:9000

## Development

For local development:

1. Start Kafka infrastructure:
```bash
npm run compose:up
```

2. Run the application in development mode:
```bash
npm run dev:all
```

To stop the services:
1. Stop the Node.js application with Ctrl+C
2. Stop Kafka infrastructure:
```bash
npm run compose:down
```

## Debugging in VS Code

The project includes VS Code debug configurations for local development. You can debug the services independently or together:

1. First, ensure Kafka infrastructure is running:
```bash
npm run compose:up
```

2. Open the project in VS Code and use the Debug view (Ctrl+Shift+D or Cmd+Shift+D)

3. Choose one of the following debug configurations:
   - **Debug Producer**: Debug only the Kafka producer service
   - **Debug Consumer**: Debug only the Kafka consumer service
   - **Debug Web Service**: Debug only the web API service
   - **Debug Consumer & Producer**: Debug both consumer and producer together

4. Set breakpoints in your code and start debugging with F5

Debug Features:
- Integrated terminal output for better log visibility
- Source map support for TypeScript debugging
- Hot reload support with ts-node
- Environment variables pre-configured for local development
- Separate client IDs for each service to avoid conflicts

Debugging Tips:
1. Use the integrated VS Code terminal to see the output
2. Check Kafdrop (http://localhost:9000) to monitor Kafka topics and messages
3. Use the web service endpoints to trigger producer messages
4. Set breakpoints in the consumer code to inspect incoming messages

## API Endpoints

- `POST /messages`: Send a message to Kafka
  ```json
  {
    "content": "Your message content",
    "type": "message-type",
    "metadata": {},
    "payload": {}
  }
  ```
- `GET /health`: Health check endpoint

## Kafka Management

The project includes Kafdrop, a web UI for monitoring Kafka:
- Access Kafdrop at http://localhost:9000
- Features:
  - View Kafka brokers
  - View topics and their configurations
  - Browse messages within topics
  - View consumer groups and their lag
  - Create new topics

## Project Structure

```
src/
├── consumer/     # Kafka consumer implementation
├── producer/     # Kafka producer implementation
├── shared/       # Shared utilities and types
└── web/         # Web service implementation
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| KAFKA_CLIENT_ID | Kafka client identifier | kafka-experiment |
| KAFKA_BROKERS | Kafka broker addresses | localhost:29092 |
| KAFKA_TOPIC | Kafka topic name | messages-topic |
| KAFKA_GROUP_ID | Consumer group ID | kafka-experiment-group |
| API_PORT | Web API port | 3000 |

## Docker Services

- **kafka**: Apache Kafka broker
- **zookeeper**: ZooKeeper for Kafka
- **kafdrop**: Web UI for Kafka monitoring and management

## License

ISC 