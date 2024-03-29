import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { comparePassword, hashPassword } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { IUserRepository } from '../user/interfaces/IUserRepository';
import { TLoginPayload, TRegisterPayload } from './types';
import { IAuthService } from './interfaces/IAuthService';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: TLoginPayload) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new BadRequestException({
        code: 400,
        message: 'Invalid email or password',
      });
    }

    const isValid = comparePassword(user.password, password);
    if (!isValid) {
      throw new BadRequestException({
        code: 400,
        message: 'Invalid email or password',
      });
    }

    return this._generateToken(user);
  }

  private _generateToken(user: UserEntity) {
    const expiresIn = '30d';

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn });

    return {
      accessToken,
    };
  }

  async register(payload: TRegisterPayload) {
    const hashedPassword = hashPassword(payload.password);
    return this.userRepository.create({
      ...payload,
      password: hashedPassword,
    });
  }
}
