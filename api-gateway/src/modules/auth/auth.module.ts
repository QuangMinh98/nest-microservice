import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MessageBrokerModule } from 'src/MessageBroker/MessageBroker.module';
import { JwtStrategy } from './strategies/JwtStrategy';

@Module({
  imports: [MessageBrokerModule.register('AUTH_SERVICE')],
  controllers: [AuthController],
  providers: [JwtStrategy],
})
export class AuthModule {}
