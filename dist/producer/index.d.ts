import { Producer } from 'kafkajs';
declare let producer: Producer;
declare const initProducer: () => Promise<void>;
export { producer, initProducer };
