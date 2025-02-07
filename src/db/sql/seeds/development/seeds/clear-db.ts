import { Knex } from 'knex';

import { SUBSCRIPTION_API_TABLES } from '../../../constants';

export async function ClearDb(knex: Knex) {
  await knex(SUBSCRIPTION_API_TABLES.USERS).del();
  await knex(SUBSCRIPTION_API_TABLES.SUBSCRIPTIONS).del();
}
