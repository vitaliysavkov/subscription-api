import { Injectable } from '@nestjs/common';

import { UserFeaturesNamespace } from './user/user.features.namespace';

@Injectable()
export class Features {
  constructor(public readonly user: UserFeaturesNamespace) {}
}
