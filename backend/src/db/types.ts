import type { Generated } from 'kysely';

export interface Database {
  users: UsersTable;
  accounts: AccountsTable;
  spaces: SpacesTable;
  space_members: SpaceMembersTable;
  space_accounts: SpaceAccountsTable;
  categories: CategoriesTable;
  transactions: TransactionsTable;
  budgets: BudgetsTable;
  budget_categories: BudgetCategoriesTable;
  savings_goals: SavingsGoalsTable;
  savings_goal_transactions: SavingsGoalTransactionsTable;
}

export interface UsersTable {
  id: Generated<number>;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface AccountsTable {
  id: Generated<number>;
  user_id: number;
  name: string;
  account_type: string;
  initial_balance: string;
  created_at: Date;
  updated_at: Date;
  status: string;
}

export interface SpacesTable {
  id: Generated<number>;
  name: string;
  space_type: string;
  created_by_user_id: number;
  created_at: Date;
}

export interface SpaceMembersTable {
  space_id: number;
  user_id: number;
  role: string;
}

export interface SpaceAccountsTable {
  space_id: number;
  account_id: number;
}

export interface CategoriesTable {
  id: Generated<number>;
  space_id: number;
  name: string;
  type: string;
  is_default: boolean;
  created_at: Date;
}

export interface TransactionsTable {
  id: Generated<number>;
  account_id: number;
  space_id: number;
  category_id: number | null;
  reference_id: string | null;
  amount: string;
  type: string;
  date: Date;
  description: string;
  created_at: Date;
}

export interface BudgetsTable {
  id: Generated<number>;
  space_id: number;
  month: number;
  year: number;
  created_at: Date;
}

export interface BudgetCategoriesTable {
  id: Generated<number>;
  budget_id: number;
  category_id: number;
  amount: string;
}

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
