import { AccountsTable } from './accounts.js';
import { BudgetCategoriesTable, BudgetsTable } from './budgets.js';
import { CategoriesTable } from './categories.js';
import { RefreshTokensTable } from './refreshTokens.js';
import { SavingsGoalsTable, SavingsGoalTransactionsTable } from './savings.js';
import {
  SpacesTable,
  SpaceAccountsTable,
  SpaceMembersTable,
} from './spaces.js';
import { TransactionsTable } from './transactions.js';
import { UsersTable } from './users.js';

export interface Database {
  users: UsersTable;
  accounts: AccountsTable;
  refresh_tokens: RefreshTokensTable;
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
