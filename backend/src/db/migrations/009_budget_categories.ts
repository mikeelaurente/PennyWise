import { Kysely, sql } from 'kysely';
import type { Database } from '../types/index.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('budget_categories')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('budget_id', 'bigint', (col) =>
      col.notNull().references('budgets.id').onDelete('cascade'),
    )
    .addColumn('category_id', 'bigint', (col) =>
      col.notNull().references('categories.id').onDelete('cascade'),
    )
    .addColumn('amount', 'numeric(15, 2)', (col) => col.notNull())
    .addUniqueConstraint('unique_budget_category', ['budget_id', 'category_id'])
    .addCheckConstraint('budget_category_amount_positive', sql`amount > 0`)
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('budget_categories').execute();
}
