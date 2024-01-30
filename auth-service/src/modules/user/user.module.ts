import { Module } from '@nestjs/common';
import { MessageBrokerModule } from 'src/MessageBroker/MessageBroker.module';
import { IUserRepository } from './interfaces/IUserRepository';
import { UserRepository } from './user.repository';

@Module({
  imports: [MessageBrokerModule.register('USER_SERVICE')],
  controllers: [],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
