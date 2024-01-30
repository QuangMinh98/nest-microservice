import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('dbConnectionString'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
