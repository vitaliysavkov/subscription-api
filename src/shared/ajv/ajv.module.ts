import { Module, Provider } from '@nestjs/common';
import Ajv from 'ajv';

const AjvProvider: Provider = {
  provide: Ajv,
  useFactory: () => {
    return new Ajv({ useDefaults: true, allErrors: true, coerceTypes: true, removeAdditional: 'all' });
  },
};

@Module({
  providers: [AjvProvider],
  exports: [AjvProvider],
})
export class AjvModule {}
