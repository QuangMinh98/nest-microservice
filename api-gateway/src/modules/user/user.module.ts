import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MessageBrokerModule } from 'src/MessageBroker/MessageBroker.module';

@Module({
  imports: [MessageBrokerModule.register('USER_SERVICE')],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
