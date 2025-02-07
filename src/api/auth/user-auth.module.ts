import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserAccessStrategy } from './strategies/user-access.strategy';
import { UserAuthController } from './user-auth.controller';

@Module({
  controllers: [UserAuthController],
  providers: [UserAccessStrategy, AuthService],
})
export class UserAuthModule {}
