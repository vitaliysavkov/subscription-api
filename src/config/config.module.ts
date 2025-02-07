import { Module } from '@nestjs/common';

import { ConfigServiceProvider } from './config.service.provider';

@Module({
  providers: [ConfigServiceProvider],
  exports: [ConfigServiceProvider],
})
export class ConfigModule {}
