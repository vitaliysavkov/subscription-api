import { ValueOf } from './types/utils';

export const AUTH_STRATEGIES = {
  USER_ACCESS: 'user_access',
  USER_REFRESH: 'user_refresh',
} as const;

export type AUTH_STRATEGIES = ValueOf<typeof AUTH_STRATEGIES>;

export const JWT_TOKEN_AUDIENCES = {
  USER_ACCESS: 'user_access',
  USER_REFRESH: 'user_refresh',
} as const;

export type JWT_TOKEN_AUDIENCES = ValueOf<typeof JWT_TOKEN_AUDIENCES>;

export const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/;

