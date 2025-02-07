import Ajv, { JSONSchemaType } from 'ajv';
import * as dotenv from 'dotenv';
import * as process from 'process';

import { LOG_LEVEL } from './constants';
import { Config } from './types';

interface ProcessEnv {
  // APP
  NODE_ENV: 'development' | 'staging' | 'production' | 'test';
  PORT: number;
  LOG_LEVEL: LOG_LEVEL;
  // DB
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_SSL: string;
  SSL_ENABLED: boolean;
  DB_LOGGING: boolean;
  // JWT
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_ACCESS_TOKEN_TTL: number;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_TTL: number;

  // REDIS Cache
  REDIS_CACHE_ENABLED: boolean;
  REDIS_CACHE_HOST: string;
  REDIS_CACHE_PORT: number;
  REDIS_CACHE_PASSWORD: string | undefined;
  REDIS_CACHE_USER: string;

  //REDIS BullMq
  REDIS_QUEUE_HOST: string;
  REDIS_QUEUE_PORT: number;
  REDIS_QUEUE_USER: string;
  REDIS_QUEUE_PASSWORD: string | undefined;
}

const ProcessEnvSchema: JSONSchemaType<ProcessEnv> = {
  type: 'object',
  properties: {
    // App
    NODE_ENV: {
      type: 'string',
      enum: ['development', 'staging', 'production', 'test'],
      default: 'development',
    },
    LOG_LEVEL: { type: 'string', enum: Object.values(LOG_LEVEL), default: LOG_LEVEL.INFO },
    PORT: { type: 'integer', default: 3000 },
    //DB
    DB_HOST: { type: 'string', default: 'localhost' },
    DB_PORT: { type: 'integer', default: 5432 },
    DB_NAME: { type: 'string', default: 'smartchat' },
    DB_USERNAME: { type: 'string', default: 'postgres' },
    DB_PASSWORD: { type: 'string', default: 'root' },
    SSL_ENABLED: { type: 'boolean', default: false },
    DB_SSL: { type: 'string' },
    DB_LOGGING: { type: 'boolean', default: false },
    // JWT
    JWT_ACCESS_TOKEN_SECRET: { type: 'string', default: 'secret' },
    JWT_ACCESS_TOKEN_TTL: { type: 'integer', default: 3600 },
    JWT_REFRESH_TOKEN_SECRET: { type: 'string', default: 'secret' },
    JWT_REFRESH_TOKEN_TTL: { type: 'integer', default: 86400 },
    //REDIS Cache
    REDIS_CACHE_ENABLED: { type: 'boolean', default: false },
    REDIS_CACHE_HOST: { type: 'string' },
    REDIS_CACHE_PORT: { type: 'integer' },
    REDIS_CACHE_USER: { type: 'string' },
    REDIS_CACHE_PASSWORD: { type: 'string', nullable: true },
    //REDIS BullMq
    REDIS_QUEUE_HOST: { type: 'string' },
    REDIS_QUEUE_PORT: { type: 'integer' },
    REDIS_QUEUE_USER: { type: 'string' },
    REDIS_QUEUE_PASSWORD: { type: 'string', nullable: true },
  },
  required: [],
};

export const LoadConfig = (ajv: Ajv): Config => {
  dotenv.config();

  const validateFn = ajv.compile(ProcessEnvSchema);
  const env = Object.assign({}, process.env);

  if (!validateFn(env)) {
    console.error(validateFn.errors);
    process.exit(1);
  }

  return {
    app: {
      env: env.NODE_ENV,
      port: env.PORT,
      logLevel: env.LOG_LEVEL,
    },
    db: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      ssl: env.SSL_ENABLED,
      sslCert: env.DB_SSL,
      logging: env.DB_LOGGING,
    },
    redis: {
      cache: {
        host: env.REDIS_CACHE_HOST,
        port: env.REDIS_CACHE_PORT,
        user: env.REDIS_CACHE_USER,
        password: env.REDIS_CACHE_PASSWORD,
        enabled: env.REDIS_CACHE_ENABLED,
      },
      bullmq: {
        host: env.REDIS_QUEUE_HOST,
        port: env.REDIS_QUEUE_PORT,
        user: env.REDIS_QUEUE_USER,
        password: env.REDIS_QUEUE_PASSWORD,
      },
    },
    jwt: {
      access: {
        secret: env.JWT_ACCESS_TOKEN_SECRET,
        ttl: env.JWT_ACCESS_TOKEN_TTL,
      },
      refresh: {
        secret: env.JWT_REFRESH_TOKEN_SECRET,
        ttl: env.JWT_REFRESH_TOKEN_TTL,
      },
    },
  }
};
