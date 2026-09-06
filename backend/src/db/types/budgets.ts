import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface BudgetsTable {
  id: Generated<number>;
  space_id: number;
  month: number;
  year: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface BudgetCategoriesTable {
  id: Generated<number>;
  budget_id: number;
  category_id: number;
  amount: string;
}

export type Budget = Selectable<BudgetsTable>;
export type NewBudget = Insertable<BudgetsTable>;
export type BudgetUpdate = Updateable<BudgetsTable>;

export type BudgetCategory = Selectable<BudgetCategoriesTable>;
export type NewBudgetCategory = Insertable<BudgetCategoriesTable>;
export type BudgetCategoryUpdate = Updateable<BudgetCategoriesTable>;
