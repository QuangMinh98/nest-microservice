import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({})
export class RedisModule {
  static register(serviceName: string): DynamicModule {
    const providers = [
      {
        provide: serviceName,
        useFactory: (configService: ConfigService) => {
          return ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
              host: configService.get('redisHost'),
              port: Number(configService.get('redisPort')),
            },
          });
        },
        inject: [ConfigService],
      },
    ];

    return {
      module: RedisModule,
      imports: [],
      providers,
      exports: providers,
    };
  }
}
