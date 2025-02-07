import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'objection';

import { SubscriptionModelFields } from '../../../../common/types/models/subscription';
import { SubscriptionModel } from '../../models/subscruption/subscription.model';

@Injectable()
export class SubscriptionRepository {
  constructor(
    @Inject(SubscriptionModel.name)
    private readonly subscriptionModel: typeof SubscriptionModel,
  ) {}

  async findById(
    id: string,
    transaction?: Transaction,
  ): Promise<SubscriptionModelFields | void> {
    return this.subscriptionModel.query(transaction).findById(id);
  }
}
