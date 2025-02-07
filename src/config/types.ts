import { LOG_LEVEL } from './constants';

export interface Config {
  app: {
    env: 'development' | 'staging' | 'production' | 'test';
    port: number;
    logLevel: LOG_LEVEL;
  };
  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    ssl: boolean;
    sslCert?: string;
    logging: boolean;
  };
  jwt: {
    access: {
      secret: string;
      ttl: number;
    };
    refresh: {
      secret: string;
      ttl: number;
    };
  };
  redis: {
    cache: {
      enabled: boolean;
      host: string;
      port: number;
      user: string;
      password?: string;
    };
    bullmq: {
      host: string;
      port: number;
      user: string;
      password?: string;
    };
  };
}
