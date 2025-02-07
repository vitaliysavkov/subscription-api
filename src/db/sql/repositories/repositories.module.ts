import { Module } from '@nestjs/common';

import { UserRepository } from './user/user.repository';
import { ModelsModule } from './models.module';
import { SubscriptionRepository } from './subscription/subscription.repository';

const repositories = [UserRepository, SubscriptionRepository];

@Module({
  imports: [ModelsModule],
  providers: repositories,
  exports: [...repositories, ModelsModule],
})
export class RepositoriesModule {}
