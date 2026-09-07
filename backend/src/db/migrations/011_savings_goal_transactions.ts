import { Kysely, sql } from 'kysely';
import type { Database } from '../types/index.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await sql`
    CREATE TYPE savings_transaction_type AS ENUM (
      'contribution',
      'withdrawal'
    )
  `.execute(db);

  await db.schema
    .createTable('savings_goal_transactions')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('savings_goal_id', 'bigint', (col) =>
      col.notNull().references('savings_goals.id').onDelete('cascade'),
    )
    .addColumn('amount', 'numeric(15, 2)', (col) => col.notNull())
    .addColumn('type', sql`savings_transaction_type`, (col) => col.notNull())
    .addColumn('date', 'date', (col) =>
      col.notNull().defaultTo(sql`CURRENT_DATE`),
    )
    .addColumn('description', 'text')
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo('now()'),
    )
    .addCheckConstraint('savings_transaction_amount_positive', sql`amount > 0`)
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('savings_goal_transactions').execute();

  await sql`
    DROP TYPE savings_transaction_type
  `.execute(db);
}
