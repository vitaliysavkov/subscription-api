import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import {
  AUTH_STRATEGIES,
  JWT_TOKEN_AUDIENCES,
} from '../../../common/constants';
import { ConfigService } from '../../../config/config.service';

@Injectable()
export class UserRefreshStrategy extends PassportStrategy(
  Strategy,
  AUTH_STRATEGIES.USER_REFRESH,
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('jwt.refresh.secret'),
      audience: JWT_TOKEN_AUDIENCES.USER_REFRESH,
      ignoreExpiration: false,
      algorithms: ['HS256'],
    });
  }

  validate(payload: { id: string }) {
    return { id: payload.id };
  }
}
