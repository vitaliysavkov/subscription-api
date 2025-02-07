import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JWT_TOKEN_AUDIENCES } from '../../../../common/constants';
import { UserModelFields } from '../../../../common/types/models/user';
import { ConfigService } from '../../../../config/config.service';
import { IFeature } from '../../../features.types';

interface Payload {
  user: UserModelFields;
}

type JwtConfig = {
  access: {
    issuer: string;
    audience: string;
    secret: string;
    expiresIn?: number;
  };
  refresh: {
    issuer: string;
    audience: string;
    secret: string;
    expiresIn?: number;
  };
};

@Injectable()
export class IssueTokensFeature implements IFeature {
  private config: JwtConfig;

  constructor(
    config: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.config = {
      access: {
        issuer: 'subscription-api-backend',
        audience: JWT_TOKEN_AUDIENCES.USER_ACCESS,
        secret: config.get('jwt.access.secret'),
        expiresIn: config.get('jwt.access.ttl'),
      },
      refresh: {
        issuer: 'subscription-api-backend',
        audience: JWT_TOKEN_AUDIENCES.USER_REFRESH,
        secret: config.get('jwt.refresh.secret'),
        expiresIn: config.get('jwt.refresh.ttl'),
      },
    };
  }

  async execute(payload: Payload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: payload.user.id,
          email: payload.user.email,
          subscriptionId: payload.user.subscriptionId,
        },
        this.config.access,
      ),
      this.jwtService.signAsync(
        {
          id: payload.user.id,
        },
        this.config.refresh,
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
