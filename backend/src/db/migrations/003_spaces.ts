import { Kysely, sql } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await sql`
    CREATE TYPE spaces_type AS ENUM (
      'individual',
      'shared'
    )
  `.execute(db);

  await db.schema
    .createTable('spaces')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(100)', (col) => col.notNull())
    .addColumn('type', sql`spaces_type`, (col) => col.notNull())
    .addColumn('created_by_user_id', 'bigint', (col) =>
      col.notNull().references('users.id').onDelete('cascade'),
    )
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo('now()'),
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('spaces').execute();

  await sql`
    DROP TYPE spaces_type
  `.execute(db);
}
