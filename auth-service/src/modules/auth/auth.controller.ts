import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { Controller } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  create(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern('register')
  register(@Payload() registerDto: any) {
    return this.authService.register(registerDto);
  }
}
