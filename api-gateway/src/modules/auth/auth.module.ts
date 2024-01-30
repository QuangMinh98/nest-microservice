import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MessageBrokerModule } from 'src/MessageBroker/MessageBroker.module';
import { JwtStrategy } from './strategies/JwtStrategy';

@Module({
  imports: [MessageBrokerModule.register('AUTH_SERVICE')],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
