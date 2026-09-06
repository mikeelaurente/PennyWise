import { Kysely } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('space_accounts')
    .addColumn('space_id', 'bigint', (col) =>
      col.notNull().references('spaces.id').onDelete('cascade'),
    )
    .addColumn('account_id', 'bigint', (col) =>
      col.notNull().references('accounts.id').onDelete('cascade'),
    )
    .addPrimaryKeyConstraint('space_accounts_pkey', ['space_id', 'account_id'])
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('space_accounts').execute();
}
