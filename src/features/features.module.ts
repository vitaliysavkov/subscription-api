import { Module } from '@nestjs/common';

import { Features } from './features.service';
import { UserFeaturesModule } from './user/user.features.module';

const modules = [UserFeaturesModule];

@Module({
  imports: modules,
  providers: [Features],
  exports: [Features],
})
export class FeaturesModule {}
