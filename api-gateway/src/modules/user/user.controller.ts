import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientKafka } from '@nestjs/microservices';
import { User } from 'src/decorators/UserDecorator';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard';
import { ReqUser } from '../auth/types';
import { TUserDetail } from './types';
import { firstValueFrom } from 'rxjs';

@Controller('user')
export class UserController implements OnModuleInit {
  constructor(@Inject('USER_SERVICE') private client: ClientKafka) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.client.send('createUser', createUserDto);
  }

  @Get()
  findAll() {
    return this.client.send('findAllUser', {});
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@User() user: ReqUser) {
    const me = await firstValueFrom(
      this.client.send<TUserDetail>('findOneUser', user.id),
    );
    delete me['password'];
    return me;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('findOneUser', id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.client.send('updateUser', { id, updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('removeUser', id);
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf('createUser');
    this.client.subscribeToResponseOf('findAllUser');
    this.client.subscribeToResponseOf('findOneUser');
    this.client.subscribeToResponseOf('updateUser');
    this.client.subscribeToResponseOf('removeUser');
    await this.client.connect();
  }
}
