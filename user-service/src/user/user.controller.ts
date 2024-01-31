import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/IUserService';

@Controller()
export class UserController {
  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
  ) {}

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('findAllUser')
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }

  @MessagePattern('findByEmail')
  findByEmail(@Payload() email: string) {
    return this.userService.findByEmail(email);
  }

  @MessagePattern('updateUser')
  update(
    @Payload('id') id: string,
    @Payload('body') updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: string) {
    return this.userService.remove(id);
  }
}
