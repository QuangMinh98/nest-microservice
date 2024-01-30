import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  getByEmail(email: string): Promise<UserEntity>;
}

export const IUserRepository = Symbol('IUserRepository');
