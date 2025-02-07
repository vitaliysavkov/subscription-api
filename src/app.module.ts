import { Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DbModule } from './db/db.module';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    { global: true, module: SharedModule },
    { global: true, module: ConfigModule },
    { global: true, module: DbModule },
    { global: true, module: FeaturesModule },
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
