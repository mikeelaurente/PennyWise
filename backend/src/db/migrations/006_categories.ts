import { Kysely } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('categories')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('space_id', 'bigint', (col) =>
      col.notNull().references('spaces.id').onDelete('cascade'),
    )
    .addColumn('name', 'varchar(100)', (col) => col.notNull())
    .addColumn('type', 'varchar(50)', (col) => col.notNull())
    .addColumn('is_default', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo('now()'),
    )
    .addUniqueConstraint('unique_category_name', ['space_id', 'name', 'type'])
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('categories').execute();
}
