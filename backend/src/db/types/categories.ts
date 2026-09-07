import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export type CategoryType = 'income' | 'expense';

export interface CategoriesTable {
  id: Generated<number>;
  space_id: number;
  name: string;
  type: CategoryType;
  is_default: ColumnType<boolean, boolean | undefined, boolean | undefined>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Category = Selectable<CategoriesTable>;
export type NewCategory = Insertable<CategoriesTable>;
export type CategoryUpdate = Updateable<CategoriesTable>;
