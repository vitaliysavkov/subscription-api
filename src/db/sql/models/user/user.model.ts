import { Model } from 'objection';

import { UserModelFields } from '../../../../common/types/models/user';
import { SUBSCRIPTION_API_TABLES } from '../../constants';

export class UserModel extends Model implements UserModelFields {
  static tableName = SUBSCRIPTION_API_TABLES.USERS;

  id: string;
  email: string;
  password: string;
  subscriptionId?: string | null;
  expiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
