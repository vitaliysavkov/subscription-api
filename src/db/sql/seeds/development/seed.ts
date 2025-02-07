import { Knex } from 'knex';

import { ClearDb } from './seeds/clear-db';

const seeds = [ClearDb];

export async function seed(knex: Knex) {
  for (const fn of seeds) {
    await fn(knex);
  }
}
