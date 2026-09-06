import { Generated, Insertable, Selectable, Updateable } from 'kysely';

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

export type Transaction = Selectable<TransactionsTable>;
export type NewTransaction = Insertable<TransactionsTable>;
export type TransactionUpdate = Updateable<TransactionsTable>;
