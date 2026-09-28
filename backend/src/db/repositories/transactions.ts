import { db } from '../index.js';
import type {
  NewTransaction,
  TransactionFilter,
  TransactionUpdate,
} from '../types/transactions.js';

export const getAllTransactions = async (
  userId: number,
  spaceId: number,
  filter: TransactionFilter,
  limit: number,
  offset: number,
) => {
  let query = db
    .selectFrom('transactions')
    .innerJoin('accounts', 'accounts.id', 'transactions.account_id')
    .innerJoin('space_members', 'space_members.space_id', 'transactions.space_id')
    .selectAll('transactions')
    .where('accounts.user_id', '=', userId)
    .where('space_members.user_id', '=', userId)
    .where('transactions.space_id', '=', spaceId);

  let countQuery = db
    .selectFrom('transactions')
    .innerJoin('accounts', 'accounts.id', 'transactions.account_id')
    .innerJoin('space_members', 'space_members.space_id', 'transactions.space_id')
    .select(({ fn }) => fn.count('transactions.id').as('total'))
    .where('accounts.user_id', '=', userId)
    .where('space_members.user_id', '=', userId)
    .where('transactions.space_id', '=', spaceId);

  if (filter.search) {
    const search = `%${filter.search}%`;
    query = query.where('transactions.description', 'ilike', search);
    countQuery = countQuery.where('transactions.description', 'ilike', search);
  }

  if (filter.type) {
    query = query.where('transactions.type', '=', filter.type);
    countQuery = countQuery.where('transactions.type', '=', filter.type);
  }

  if (filter.accountId) {
    query = query.where('transactions.account_id', '=', filter.accountId);
    countQuery = countQuery.where('transactions.account_id', '=', filter.accountId);
  }

  if (filter.categoryId) {
    query = query.where('transactions.category_id', '=', filter.categoryId);
    countQuery = countQuery.where('transactions.category_id', '=', filter.categoryId);
  }

  if (filter.startDate) {
    query = query.where('transactions.date', '>=', filter.startDate);
    countQuery = countQuery.where('transactions.date', '>=', filter.startDate);
  }

  if (filter.endDate) {
    query = query.where('transactions.date', '<=', filter.endDate);
    countQuery = countQuery.where('transactions.date', '<=', filter.endDate);
  }

  const transactions = await query
    .orderBy('transactions.date', 'desc')
    .orderBy('transactions.id', 'desc')
    .limit(limit)
    .offset(offset)
    .execute();
  const countResult = await countQuery.executeTakeFirst();
  const total = Number(countResult?.total ?? 0);

  return {
    transactions,
    total,
    totalPage: Math.ceil(total / limit),
  };
};

export const getTransactionById = async (id: number, userId: number) => {
  return db
    .selectFrom('transactions')
    .innerJoin('accounts', 'accounts.id', 'transactions.account_id')
    .innerJoin('space_members', 'space_members.space_id', 'transactions.space_id')
    .selectAll('transactions')
    .where('transactions.id', '=', id)
    .where('accounts.user_id', '=', userId)
    .where('space_members.user_id', '=', userId)
    .executeTakeFirst();
};

export const getAvailableAccount = async (
  accountId: number,
  spaceId: number,
  userId: number,
) => {
  return db
    .selectFrom('accounts')
    .innerJoin('space_accounts', 'space_accounts.account_id', 'accounts.id')
    .innerJoin('space_members', 'space_members.space_id', 'space_accounts.space_id')
    .select('accounts.id')
    .where('accounts.id', '=', accountId)
    .where('accounts.user_id', '=', userId)
    .where('space_accounts.space_id', '=', spaceId)
    .where('space_members.user_id', '=', userId)
    .executeTakeFirst();
};

export const createTransaction = async (transaction: NewTransaction) => {
  return db
    .insertInto('transactions')
    .values(transaction)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const updateTransaction = async (
  id: number,
  userId: number,
  data: TransactionUpdate,
) => {
  return db
    .updateTable('transactions')
    .set(data)
    .where('id', '=', id)
    .where('type', 'in', ['income', 'expense'])
    .where('account_id', 'in', db
      .selectFrom('accounts')
      .select('id')
      .where('user_id', '=', userId))
    .where('space_id', 'in', db
      .selectFrom('space_members')
      .select('space_id')
      .where('user_id', '=', userId))
    .returningAll()
    .executeTakeFirst();
};

export const deleteTransaction = async (id: number, userId: number) => {
  return db
    .deleteFrom('transactions')
    .where('id', '=', id)
    .where('type', 'in', ['income', 'expense'])
    .where('account_id', 'in', db
      .selectFrom('accounts')
      .select('id')
      .where('user_id', '=', userId))
    .where('space_id', 'in', db
      .selectFrom('space_members')
      .select('space_id')
      .where('user_id', '=', userId))
    .returningAll()
    .executeTakeFirst();
};
