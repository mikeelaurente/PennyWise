import { Kysely } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('accounts')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('user_id', 'bigint', (col) =>
      col.notNull().references('users.id').onDelete('cascade'),
    )
    .addColumn('name', 'varchar(100)', (col) => col.notNull())
    .addColumn('account_type', 'varchar(50)', (col) => col.notNull())
    .addColumn('initial_balance', 'numeric(15, 2)', (col) =>
      col.notNull().defaultTo(0),
    )
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo('now()'),
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.notNull().defaultTo('now()'),
    )
    .addColumn('status', 'varchar(20)', (col) =>
      col.notNull().defaultTo('active'),
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('accounts').execute();
}
