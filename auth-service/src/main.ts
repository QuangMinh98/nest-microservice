import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { getMicroserviceOptions } from './microservices';
import { ExceptionFilter } from './filter/ExceptionFilter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    getMicroserviceOptions(Transport.KAFKA),
  );
  app.useGlobalFilters(new ExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen();
}
bootstrap();
