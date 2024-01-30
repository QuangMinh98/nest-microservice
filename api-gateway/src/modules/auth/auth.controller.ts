import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController implements OnModuleInit {
  constructor(@Inject('AUTH_SERVICE') private client: ClientKafka) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.client.send('login', {
      ...loginDto,
    });
  }

  @Post('register')
  register(@Body() registerDto: any) {
    return this.client.send('register', registerDto);
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf('login');
    this.client.subscribeToResponseOf('register');
    await this.client.connect();
  }
}
