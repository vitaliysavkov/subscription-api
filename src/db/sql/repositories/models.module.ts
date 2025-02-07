import { Module } from '@nestjs/common';

import { KnexModule } from '../knex/knex.module';
import { ModelProviders } from '../models';
import { KnexFactory } from './knex-config.factory';

@Module({
  imports: [KnexModule.register({ config: KnexFactory })],
  providers: ModelProviders,
  exports: [...ModelProviders, KnexModule],
})
export class ModelsModule {}
