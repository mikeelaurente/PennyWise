import { Kysely } from 'kysely';
import type { Database } from '../types/index.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable('transactions')
    .addForeignKeyConstraint(
      'fk_transactions_space_account',
      ['space_id', 'account_id'],
      'space_accounts',
      ['space_id', 'account_id'],
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable('transactions')
    .dropConstraint('fk_transactions_space_account')
    .execute();
}
