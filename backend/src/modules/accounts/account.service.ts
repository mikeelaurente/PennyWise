import {
  createAccount,
  getAccountById,
} from '../../db/repositories/accounts.js';
import { CreateAccountInput } from './account.schema.js';

export const getAccountByIdS = async (id: number, userId: number) => {
  return getAccountById(id, userId);
};

export const createAccountS = async (
  userId: number,
  input: CreateAccountInput,
) => {
  const account = {
    user_id: userId,
    name: input.name,
    account_type: input.accountType,
    initial_balance: input.initialBalance,
  };

  return createAccount(account);
};
