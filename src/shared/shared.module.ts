import { Module } from '@nestjs/common';

import { AjvModule } from './ajv/ajv.module';

const modules = [AjvModule];

@Module({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
