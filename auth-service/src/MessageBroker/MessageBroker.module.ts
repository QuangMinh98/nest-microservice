import { DynamicModule, Module } from '@nestjs/common';
import { KafkaModule } from './Kafka/Kafka.module';

@Module({})
export class MessageBrokerModule {
  static register(serviceName: string): DynamicModule {
    return {
      module: MessageBrokerModule,
      imports: [KafkaModule.register(serviceName)],
      providers: [],
      exports: [KafkaModule],
    };
  }
}
