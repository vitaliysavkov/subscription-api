import { Model } from 'objection';

import {
  SubscriptionModelFields,
  SubscriptionType,
} from '../../../../common/types/models/subscription';
import { SUBSCRIPTION_API_TABLES } from '../../constants';

export class SubscriptionModel
  extends Model
  implements SubscriptionModelFields
{
  static tableName = SUBSCRIPTION_API_TABLES.SUBSCRIPTIONS;

  id: string;
  type: SubscriptionType;
  price: number;
  createdAt: string;
  updatedAt: string;
}
