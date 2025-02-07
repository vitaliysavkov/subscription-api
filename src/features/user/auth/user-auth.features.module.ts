import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { IssueTokensFeature } from './features/issue-tokens.feature';
import { UserAuthFeaturesNamespace } from './user-auth.features.namespace';

const features = [UserAuthFeaturesNamespace, IssueTokensFeature];

@Module({
  imports: [JwtModule.register({})],
  providers: features,
  exports: [UserAuthFeaturesNamespace],
})
export class UserAuthFeaturesModule {}
