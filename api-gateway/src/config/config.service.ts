import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      rmqConnectionString: process.env.RMQ_CONNECTION_STRING,
      redisHost: process.env.REDIS_HOST,
      redisPort: process.env.REDIS_PORT,
      kafkaConnectionString: process.env.KAFKA_CONNECTION_STRING,
      jwtKey: process.env.JWT_KEY,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
