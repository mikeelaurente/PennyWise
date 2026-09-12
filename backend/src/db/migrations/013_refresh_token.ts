import { Kysely, sql } from 'kysely';
import { Database } from '../types/index.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('refresh_tokens')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('user_id', 'bigint', (col) =>
      col.notNull().references('users.id').onDelete('cascade'),
    )
    .addColumn('token_hash', 'text', (col) => col.notNull().unique())
    .addColumn('expires_at', 'timestamptz', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('revoked_at', 'timestamptz')
    .execute();

  await db.schema
    .createIndex('refresh_tokens_user_id_idx')
    .on('refresh_tokens')
    .column('user_id')
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('refresh_tokens').execute();
}
