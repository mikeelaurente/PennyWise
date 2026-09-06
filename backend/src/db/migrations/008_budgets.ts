import { Kysely, sql } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('budgets')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('space_id', 'bigint', (col) =>
      col.notNull().references('spaces.id').onDelete('cascade'),
    )
    .addColumn('month', 'smallint', (col) => col.notNull())
    .addColumn('year', 'smallint', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo('now()'),
    )
    .addUniqueConstraint('unique_space_budget', ['space_id', 'month', 'year'])
    .addCheckConstraint('valid_budget_month', sql`month BETWEEN 1 AND 12`)
    .addCheckConstraint('valid_budget_year', sql`year >= 2000`)
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('budgets').execute();
}
