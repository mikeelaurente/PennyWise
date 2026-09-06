import { Kysely, sql } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('savings_goals')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('space_id', 'bigint', (col) =>
      col.notNull().references('spaces.id').onDelete('cascade'),
    )
    .addColumn('name', 'varchar(100)', (col) => col.notNull())
    .addColumn('target_amount', 'numeric(15, 2)', (col) => col.notNull())
    .addColumn('target_date', 'date')
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo('now()'),
    )
    .addCheckConstraint('savings_goal_target_positive', sql`target_amount > 0`)
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('savings_goals').execute();
}
