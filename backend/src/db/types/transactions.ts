import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export type TransactionType = 'income' | 'expense' | 'transfer';

export interface TransactionsTable {
  id: Generated<number>;
  account_id: number;
  space_id: number;
  category_id: number | null;
  reference_id: string | null;
  amount: string;
  type: TransactionType;
  date: ColumnType<Date | string, string | undefined, string>;
  description: string | null;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Transaction = Selectable<TransactionsTable>;
export type NewTransaction = Insertable<TransactionsTable>;
export type TransactionUpdate = Updateable<TransactionsTable>;

export type TransactionFilter = {
  search?: string;
  type?: 'income' | 'expense';
  accountId?: number;
  categoryId?: number;
  startDate?: string;
  endDate?: string;
};
