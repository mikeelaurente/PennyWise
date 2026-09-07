import { Kysely, sql } from 'kysely';
import type { Database } from '../types/index.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await sql`
  CREATE TYPE space_member_role AS ENUM (
    'owner',
    'member'
  )
`.execute(db);

  await db.schema
    .createTable('space_members')
    .addColumn('space_id', 'bigint', (col) =>
      col.notNull().references('spaces.id').onDelete('cascade'),
    )
    .addColumn('user_id', 'bigint', (col) =>
      col.notNull().references('users.id').onDelete('cascade'),
    )
    .addColumn('role', sql`space_member_role`, (col) =>
      col.notNull().defaultTo('member'),
    )
    .addPrimaryKeyConstraint('space_members_pkey', ['space_id', 'user_id'])
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('space_members').execute();

  await sql`
  DROP TYPE space_member_role
`.execute(db);
}
