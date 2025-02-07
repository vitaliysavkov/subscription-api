import { Provider } from '@nestjs/common';
import Ajv from 'ajv';

import { ConfigService } from './config.service';
import { LoadConfig } from './load-config';

export const ConfigServiceProvider: Provider = {
  provide: ConfigService,
  useFactory: (ajv: Ajv) => {
    const config = LoadConfig(ajv);
    return new ConfigService(config);
  },
  inject: [Ajv],
};
