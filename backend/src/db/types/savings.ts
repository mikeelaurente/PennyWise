import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export type SavingsGoalType = 'withdrawal' | 'deposit';

export interface SavingsGoalsTable {
  id: Generated<number>;
  space_id: number;
  name: string;
  target_amount: string;
  target_date: Date;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface SavingsGoalTransactionsTable {
  id: Generated<number>;
  savings_goal_id: number;
  amount: string;
  type: SavingsGoalType;
  date: Date;
  description: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type SavingsGoal = Selectable<SavingsGoalsTable>;
export type NewSavingsGoal = Insertable<SavingsGoalsTable>;
export type SavingsGoalUpdate = Updateable<SavingsGoalsTable>;

export type SavingsGoalTransaction = Selectable<SavingsGoalTransactionsTable>;
export type NewSavingsGoalTransaction =
  Insertable<SavingsGoalTransactionsTable>;
export type SavingsGoalTransactionUpdate =
  Updateable<SavingsGoalTransactionsTable>;
