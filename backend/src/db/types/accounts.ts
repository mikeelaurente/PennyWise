import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export type AccountType =
  | 'e-wallet'
  | 'bank'
  | 'cash'
  | 'credit-card'
  | 'investment';

export type AccountStatus = 'active' | 'archived' | 'closed';

export interface AccountsTable {
  id: Generated<number>;
  user_id: number;
  name: string;
  account_type: AccountType;
  initial_balance: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, string | undefined>;
  status: AccountStatus;
}

export type Account = Selectable<AccountsTable>;
export type NewAccount = Insertable<AccountsTable>;
export type AccountUpdate = Updateable<AccountsTable>;
