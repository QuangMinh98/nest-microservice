import { UserEntity } from '../entities/user.entity';
import { TCreateUserPayload, TUpdateUserPayload } from '../types';

export interface IUserService {
  create(payload: TCreateUserPayload): Promise<UserEntity>;

  findAll(): Promise<UserEntity[]>;

  findOne(id: string): Promise<UserEntity>;

  findByEmail(email: string): Promise<UserEntity>;

  update(id: string, payload: TUpdateUserPayload): string;

  remove(id: string): string;
}

export const IUserService = Symbol('IUserService');
