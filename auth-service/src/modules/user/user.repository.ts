import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { IUserRepository } from './interfaces/IUserRepository';
import { UserEntity } from './entities/user.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserRepository implements OnModuleInit, IUserRepository {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientKafka) {}

  create(user: UserEntity) {
    return firstValueFrom(this.client.send<UserEntity>('createUser', user));
  }

  getByEmail(email: string) {
    return firstValueFrom(this.client.send<UserEntity>('findByEmail', email));
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf('findByEmail');
    this.client.subscribeToResponseOf('createUser');
    await this.client.connect();
  }
}
