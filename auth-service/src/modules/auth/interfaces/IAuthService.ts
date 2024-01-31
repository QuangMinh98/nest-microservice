import { UserEntity } from 'src/modules/user/entities/user.entity';
import { TLoginPayload, TRegisterPayload } from '../types';

export interface IAuthService {
  login(payload: TLoginPayload): Promise<{ accessToken: string }>;

  register(payload: TRegisterPayload): Promise<UserEntity>;
}

export const IAuthService = Symbol('IAuthService');
