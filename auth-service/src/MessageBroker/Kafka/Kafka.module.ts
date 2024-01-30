import { DynamicModule, Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from 'src/config';

@Module({})
export class KafkaModule {
  static register(serviceName: string): DynamicModule {
    const providers = [
      {
        provide: `${serviceName}`,
        useFactory: (configService: ConfigService) => {
          return ClientProxyFactory.create({
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: serviceName,
                brokers: [configService.get('kafkaConnectionString')],
              },
              consumer: {
                groupId: `${serviceName}-consumer-1`,
              },
            },
          });
        },
        inject: [ConfigService],
      },
    ];

    return {
      module: KafkaModule,
      imports: [],
      controllers: [],
      providers,
      exports: providers,
    };
  }
}
