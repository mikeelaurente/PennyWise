import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface AccountsTable {
  id: Generated<number>;
  Account_id: number;
  name: string;
  account_type: string;
  initial_balance: string;
  created_at: Date;
  updated_at: Date;
  status: string;
}

export type Account = Selectable<AccountsTable>;
export type NewAccount = Insertable<AccountsTable>;
export type AccountUpdate = Updateable<AccountsTable>;
