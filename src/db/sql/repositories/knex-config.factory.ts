import { ConfigService } from '../../../config/config.service';
import { KnexConfigFactory } from '../knex/knex.module';

export const KnexFactory: KnexConfigFactory = {
  useFactory: (config: ConfigService) => {
    return {
      client: 'pg',
      connection: {
        application_name: 'subscription-api',
        host: config.get('db.host'),
        port: config.get('db.port'),
        database: config.get('db.database'),
        user: config.get('db.user'),
        password: config.get('db.password'),
        ssl: config.get('db.ssl') && {
          rejectUnauthorized: true,
          ca: config.get('db.sslCert'),
        },
      },
      debug: config.get('db.logging'),
      pool: {
        min: 10,
        max: 150,
        acquireTimeoutMillis: 5000,
        createTimeoutMillis: 5000,
        reapIntervalMillis: 3000,
      },
    };
  },
  inject: [ConfigService],
};
