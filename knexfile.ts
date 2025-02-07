import 'dotenv/config';

import { join } from 'node:path';

import { Knex } from 'knex';

import { KnexMigrationSource } from './src/common/services/knex-migration-source';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    ssl: process.env.SSL_ENABLED === 'true' && {
      rejectUnauthorized: true,
      ca: process.env.DB_SSL,
    },
  },
  debug: process.env.DB_LOGGING === 'true' ? true : false,
  pool: {
    min: 10,
    max: 50,
    acquireTimeoutMillis: 5000,
  },
  migrations: {
    tableName: 'migrations',
    stub: join(
      __dirname,
      'src',
      'db',
      'sql',
      'migrations',
      'migration.stub.ts',
    ),
    migrationSource: new KnexMigrationSource(
      '.ts',
      join(__dirname, 'src', 'db', 'sql', 'migrations', 'migrations'),
    ),
  },
  seeds: {
    directory: join(
      __dirname,
      'src',
      'db',
      'sql',
      'seeds',
      'development',
      'seeds',
    ),
    stub: join(__dirname, 'src', 'db', 'sql', 'seeds', 'seeds.stub.ts'),
  },
};

export default {
  development: config,
  production: config,
  staging: config,
};
