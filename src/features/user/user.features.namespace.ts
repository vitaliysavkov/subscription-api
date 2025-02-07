import { Injectable } from '@nestjs/common';

import { UserAuthFeaturesNamespace } from './auth/user-auth.features.namespace';

@Injectable()
export class UserFeaturesNamespace {
  constructor(public readonly auth: UserAuthFeaturesNamespace) {}
}
