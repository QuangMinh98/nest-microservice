import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { getMicroserviceOptions } from './microservices';
import { ExceptionFilter } from './filter/ExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    getMicroserviceOptions(Transport.KAFKA),
  );
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen();
}
bootstrap();
