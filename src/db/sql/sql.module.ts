import { Module } from '@nestjs/common';

import { RepositoriesModule } from './repositories/repositories.module';

const modules = [RepositoriesModule];

@Module({
  imports: modules,
  exports: modules,
})
export class SqlModule {}
