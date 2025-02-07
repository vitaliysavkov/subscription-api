import { Module } from '@nestjs/common';
import { UserAuthModule } from './auth/user-auth.module';

const modules = [UserAuthModule];

@Module({
  imports: modules,
})
export class ApiModule {}
