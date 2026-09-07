import { Kysely, sql } from 'kysely';
import type { Database } from '../types/index.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await sql`
    CREATE TYPE transaction_type AS ENUM (
      'expense',
      'income',
      'transfer'
    )
  `.execute(db);

  await db.schema
    .createTable('transactions')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('account_id', 'bigint', (col) =>
      col.notNull().references('accounts.id').onDelete('cascade'),
    )
    .addColumn('space_id', 'bigint', (col) =>
      col.notNull().references('spaces.id').onDelete('cascade'),
    )
    .addColumn('category_id', 'bigint', (col) =>
      col.references('categories.id').onDelete('set null'),
    )
    .addColumn('reference_id', 'bigint')
    .addColumn('amount', 'numeric(15, 2)', (col) => col.notNull())
    .addColumn('type', sql`transaction_type`, (col) => col.notNull())
    .addColumn('date', 'date', (col) =>
      col.notNull().defaultTo(sql`CURRENT_DATE`),
    )
    .addColumn('description', 'text')
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo('now()'),
    )
    .addCheckConstraint('transactions_amount_positive', sql`amount > 0`)
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('transactions').execute();

  await sql`
    DROP TYPE transaction_type
  `.execute(db);
}
