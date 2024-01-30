import { DynamicModule, Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from 'src/config';

@Module({})
export class RmqModule {
  static register(serviceName: string): DynamicModule {
    const providers = [
      {
        provide: serviceName,
        useFactory: (configService: ConfigService) => {
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [configService.get('rmqConnectionString')],
              queue: `${serviceName}_QUEUE`,
              queueOptions: {
                durable: false,
              },
            },
          });
        },
        inject: [ConfigService],
      },
    ];

    return {
      module: RmqModule,
      imports: [],
      providers,
      exports: providers,
    };
  }
}
