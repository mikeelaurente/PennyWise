import type { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface SavingsGoalsTable {
  id: Generated<number>;
  space_id: number;
  name: string;
  target_amount: string;
  target_date: Date;
  created_at: Date;
}

export interface SavingsGoalTransactionsTable {
  id: Generated<number>;
  savings_goal_id: number;
  amount: string;
  type: string;
  date: Date;
  description: string;
  created_at: Date;
}

export type SavingsGoal = Selectable<SavingsGoalsTable>;
export type NewSavingsGoal = Insertable<SavingsGoalsTable>;
export type SavingsGoalUpdate = Updateable<SavingsGoalsTable>;

export type SavingsGoalTransaction = Selectable<SavingsGoalTransactionsTable>;
export type NewSavingsGoalTransaction =
  Insertable<SavingsGoalTransactionsTable>;
export type SavingsGoalTransactionUpdate =
  Updateable<SavingsGoalTransactionsTable>;
