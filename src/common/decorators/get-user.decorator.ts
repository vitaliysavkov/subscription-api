import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, ctx): Record<string, unknown> => {
    return ctx.switchToHttp().getRequest().user;
  },
);

export type UserFromRequest = {
  id: string;
  email: string;
  subscriptionId?: string | null;
  expiresAt?: string | null;
};
