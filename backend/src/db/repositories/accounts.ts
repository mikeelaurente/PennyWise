import type {
  AccountFilter,
  UpdateAccountInput,
} from '../../modules/accounts/account.schema.js';

import type {
  AccountStatus,
  AccountType,
  NewAccount,
} from '../types/accounts.js';

import { db } from '../index.js';

export const getAllAccounts = async (
  userId: number,
  filter: AccountFilter,
  limit: number,
  offset: number,
) => {
  let query = db
    .selectFrom('accounts')
    .selectAll()
    .where('accounts.user_id', '=', userId);

  let countQuery = db
    .selectFrom('accounts')
    .select(({ fn }) => [fn.count('accounts.id').as('total')])
    .where('accounts.user_id', '=', userId);

  if (filter.search) {
    const search = `%${filter.search}%`;

    query = query.where('accounts.name', 'ilike', search);
    countQuery = countQuery.where('accounts.name', 'ilike', search);
  }

  if (filter.status) {
    query = query.where('accounts.status', '=', filter.status);
    countQuery = countQuery.where('accounts.status', '=', filter.status);
  }

  const accounts = await query.limit(limit).offset(offset).execute();

  const countResult = await countQuery.executeTakeFirst();

  const total = Number(countResult?.total ?? 0);

  return {
    accounts,
    total,
    totalPage: Math.ceil(total / limit),
  };
};

export const getAccountById = async (id: number, userId: number) => {
  return await db
    .selectFrom('accounts')
    .selectAll()
    .where('accounts.id', '=', id)
    .where('accounts.user_id', '=', userId)
    .executeTakeFirst();
};

export const createAccount = async (account: NewAccount) => {
  return await db
    .insertInto('accounts')
    .values(account)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const updateAccountStatus = async (
  accountId: number,
  userId: number,
  status: AccountStatus,
) => {
  return await db
    .updateTable('accounts')
    .set({
      status,
      updated_at: new Date().toISOString(),
    })
    .where('accounts.id', '=', accountId)
    .where('accounts.user_id', '=', userId)
    .returningAll()
    .executeTakeFirst();
};

export const checkExistingAccount = async (
  userId: number,
  name: string,
  type: AccountType,
) => {
  return await db
    .selectFrom('accounts')
    .where('accounts.user_id', '=', userId)
    .where('accounts.name', '=', name)
    .where('accounts.account_type', '=', type)
    .executeTakeFirst();
};

export const updateAccountData = async (
  userId: number,
  accountId: number,
  data: UpdateAccountInput,
) => {
  return await db
    .updateTable('accounts')
    .set(data)
    .where('accounts.user_id', '=', userId)
    .where('accounts.id', '=', accountId)
    .returningAll()
    .executeTakeFirst();
};

export const hasTransactions = async (accountId: number) => {
  const transaction = await db
    .selectFrom('transactions')
    .select('id')
    .where('account_id', '=', accountId)
    .executeTakeFirst();

  return !!transaction;
};
