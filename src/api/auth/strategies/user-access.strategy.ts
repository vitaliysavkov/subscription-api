import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import {
  AUTH_STRATEGIES,
  JWT_TOKEN_AUDIENCES,
} from '../../../common/constants';
import { ConfigService } from '../../../config/config.service';

@Injectable()
export class UserAccessStrategy extends PassportStrategy(
  Strategy,
  AUTH_STRATEGIES.USER_ACCESS,
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('jwt.access.secret'),
      audience: JWT_TOKEN_AUDIENCES.USER_ACCESS,
      ignoreExpiration: false,
      algorithms: ['HS256'],
    });
  }

  validate(payload: { id: string; email: string }) {
    return { id: payload.id, email: payload.email };
  }
}
