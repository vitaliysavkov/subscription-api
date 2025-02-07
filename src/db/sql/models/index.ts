import { Provider } from '@nestjs/common';
import { Knex } from 'knex';
import { Model } from 'objection';

import { KnexToken } from '../knex/knex.module';
import { SubscriptionModel } from './subscruption/subscription.model';
import { UserModel } from './user/user.model';

const CreateModelProvider = (model: typeof Model): Provider => {
  return {
    provide: model.name,
    useFactory: (knex: Knex) => {
      return model.bindKnex(knex);
    },
    inject: [KnexToken],
  };
};

const Models = [UserModel, SubscriptionModel];

export const ModelProviders = Models.map(CreateModelProvider);
