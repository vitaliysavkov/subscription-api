import { Module } from '@nestjs/common';

import { SqlModule } from './sql/sql.module';

const modules = [SqlModule];

@Module({
  imports: modules,
  exports: modules,
})
export class DbModule {}
