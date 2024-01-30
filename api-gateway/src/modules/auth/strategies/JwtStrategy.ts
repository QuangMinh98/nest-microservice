import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { ReqUser } from '../types';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtKey'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: ReqUser) {
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };
  }
}
