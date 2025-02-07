import { Knex } from 'knex';

import { SUBSCRIPTION_API_TABLES } from '../../constants';

const tableName = SUBSCRIPTION_API_TABLES.USERS;

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .uuid('subscriptionId')
      .references('id')
      .inTable(SUBSCRIPTION_API_TABLES.SUBSCRIPTIONS)
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT');
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
