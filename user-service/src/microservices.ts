import * as dotenv from 'dotenv';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const getRmqConnectOptions = (): NestApplicationContextOptions &
  MicroserviceOptions => {
  console.log(process.env.RMQ_CONNECTION_STRING);
  return {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_CONNECTION_STRING],
      queue: process.env.RMQ_QUEUE_NAME,
      queueOptions: {
        durable: false,
      },
    },
  };
};

const getRedisConnectOptions = (): NestApplicationContextOptions &
  MicroserviceOptions => {
  return {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  };
};

export const getKafkaConnectOptions = (): NestApplicationContextOptions &
  MicroserviceOptions => {
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_CONNECTION_STRING],
      },
      consumer: {
        groupId: 'USER_SERVICE-consumer',
      },
    },
  };
};

export const getMicroserviceOptions = (
  transport: Transport,
): NestApplicationContextOptions & MicroserviceOptions => {
  dotenv.config();

  switch (transport) {
    case Transport.RMQ:
      return getRmqConnectOptions();
    case Transport.REDIS:
      return getRedisConnectOptions();
    case Transport.KAFKA:
      return getKafkaConnectOptions();
    default:
      throw new Error('Invalid transport');
  }
};
