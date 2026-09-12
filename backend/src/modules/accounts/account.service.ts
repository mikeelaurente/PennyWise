import * as AccountRepository from '../../db/repositories/accounts.js';
import { AppError } from '../../shared/utils/app-error.util.js';
import type {
  AccountFilter,
  CreateAccountInput,
  AccountQueryParams,
  UpdateAccountInput,
  UpdateAccountStatusInput,
} from './account.schema.js';

export const getAllAccounts = async (
  userId: number,
  { status = 'active', page = 1, limit = 5, search = '' }: AccountQueryParams,
) => {
  const filter: AccountFilter = { status };

  if (search) {
    filter.search = search;
  }

  const offset = limit * (page - 1);
  return AccountRepository.getAllAccounts(userId, filter, limit, offset);
};

export const getAccountById = async (id: number, userId: number) => {
  const account = await AccountRepository.getAccountById(id, userId);

  if (!account) {
    throw new AppError(404, 'Account not found.');
  }
  return account;
};

export const createAccount = async (
  userId: number,
  input: CreateAccountInput,
) => {
  const account = {
    user_id: userId,
    name: input.name,
    account_type: input.accountType,
    initial_balance: input.initialBalance,
  };

  const existing = await AccountRepository.checkExistingAccount(
    userId,
    account.name,
    account.account_type,
  );

  if (existing) {
    throw new AppError(409, 'Account already exists.');
  }

  return AccountRepository.createAccount(account);
};

export const updateAccountStatus = async (
  accountId: number,
  userId: number,
  input: UpdateAccountStatusInput,
) => {
  const account = await AccountRepository.getAccountById(accountId, userId);

  if (!account) {
    throw new AppError(404, 'Account not found');
  }

  if (account.status === 'closed' && input.status !== 'closed') {
    throw new AppError(409, 'A closed account cannot be reopened.');
  }

  return AccountRepository.updateAccountStatus(accountId, userId, input.status);
};

export const updateAccountData = async (
  userId: number,
  accountId: number,
  data: UpdateAccountInput,
) => {
  const account = await AccountRepository.getAccountById(accountId, userId);

  if (!account) {
    throw new AppError(404, 'Account not found.');
  }

  const hasTransactions = await AccountRepository.hasTransactions(accountId);

  if (hasTransactions && data.initialBalance !== undefined) {
    throw new AppError(
      409,
      'Initial balance cannot be changed after transactions exist.',
    );
  }

  const updateData = {
    ...(data.name !== undefined && { name: data.name }),
    ...(data.accountType !== undefined && {
      account_type: data.accountType,
    }),
    ...(data.initialBalance !== undefined && {
      initial_balance: data.initialBalance,
    }),
    updated_at: new Date().toISOString(),
  };

  const updatedAccount = await AccountRepository.updateAccountData(
    userId,
    accountId,
    updateData,
  );

  if (!updatedAccount) {
    throw new AppError(404, 'Account could not be updated.');
  }

  return updatedAccount;
};
