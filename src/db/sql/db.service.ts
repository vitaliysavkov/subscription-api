import { Injectable } from '@nestjs/common';

import { SubscriptionRepository } from './repositories/subscription/subscription.repository';
import { UserRepository } from './repositories/user/user.repository';

@Injectable()
export class Db {
  constructor(
    public readonly userRepository: UserRepository,
    public readonly subscriptionRepository: SubscriptionRepository,
  ) {}
}
