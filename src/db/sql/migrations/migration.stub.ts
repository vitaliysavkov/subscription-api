import { Knex } from 'knex';

const tableName = '';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
