# Kafka Experiment

A Node.js application demonstrating Kafka integration with a web service, producer, and consumer.

## Prerequisites

- Docker and Docker Compose
- Node.js 20.x (for local development)
- npm (for local development)

## Quick Start

1. Clone the repository:
```bash
git clone <your-repository-url>
cd kafka-experiment
```

2. Create a `.env` file in the root directory with the following content:
```env
KAFKA_CLIENT_ID=kafka-experiment
KAFKA_BROKERS=kafka:9092
KAFKA_TOPIC=messages-topic
KAFKA_GROUP_ID=kafka-experiment-group
API_PORT=3000
```

3. Start the application using Docker Compose:
```bash
docker-compose up --build
```

The application will be available at:
- Web API: http://localhost:3000
- Kafka: localhost:9092 (internal: kafka:9092)
- Zookeeper: localhost:2181

## Development

For local development:

1. Install dependencies:
```bash
npm install
```

2. Build the TypeScript code:
```bash
npm run build
```

3. Start the services:
- Development mode: `npm run dev:all`
- Production mode: `npm run start:all`

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
| KAFKA_BROKERS | Kafka broker addresses | kafka:9092 |
| KAFKA_TOPIC | Kafka topic name | messages-topic |
| KAFKA_GROUP_ID | Consumer group ID | kafka-experiment-group |
| API_PORT | Web API port | 3000 |

## Docker Services

- **app**: Node.js application (Web API + Kafka integration)
- **kafka**: Apache Kafka broker
- **zookeeper**: ZooKeeper for Kafka

## License

ISC 