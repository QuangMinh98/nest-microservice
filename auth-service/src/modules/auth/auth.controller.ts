import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { IAuthService } from './interfaces/IAuthService';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
  constructor(
    @Inject(IAuthService) private readonly authService: IAuthService,
  ) {}

  @MessagePattern('login')
  create(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern('register')
  register(@Payload() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
