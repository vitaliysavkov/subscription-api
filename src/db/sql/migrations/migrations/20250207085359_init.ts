import { Knex } from 'knex';

export async function up(knex: Knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
}

export async function down(knex: Knex) {
  await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}
