import { db } from '../index.js';
import { NewAccount } from '../types/accounts.js';

export const getAllAccounts = async () => {
  return await db.selectFrom('accounts').selectAll().execute();
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
