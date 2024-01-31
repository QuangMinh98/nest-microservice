/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from './interfaces/IUserRepository';
import { TCreateUserPayload, TUpdateUserPayload } from './types';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  create(payload: TCreateUserPayload) {
    return this.userRepository.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });
  }

  findAll() {
    return this.userRepository.getAll();
  }

  findOne(id: string) {
    return this.userRepository.getById(id);
  }

  findByEmail(email: string) {
    return this.userRepository.getByEmail(email);
  }

  update(id: string, payload: TUpdateUserPayload) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
