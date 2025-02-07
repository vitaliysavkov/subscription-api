import { Module } from '@nestjs/common';

import { UserAuthFeaturesModule } from './auth/user-auth.features.module';
import { UserFeaturesNamespace } from './user.features.namespace';

const features = [UserFeaturesNamespace];

@Module({
  imports: [UserAuthFeaturesModule],
  providers: features,
  exports: [UserFeaturesNamespace],
})
export class UserFeaturesModule {}
