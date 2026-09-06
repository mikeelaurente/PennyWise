import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface CategoriesTable {
  id: Generated<number>;
  space_id: number;
  name: string;
  type: string;
  is_default: boolean;
  created_at: Date;
}

export type Category = Selectable<CategoriesTable>;
export type NewCategory = Insertable<CategoriesTable>;
export type CategoryUpdate = Updateable<CategoriesTable>;
