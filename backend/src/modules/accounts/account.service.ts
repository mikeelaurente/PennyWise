import * as AccountRepository from "../../db/repositories/accounts.js";
import { AppError } from "../../shared/utils/app-error.util.js";
import {
  AccountFilter,
  CreateAccountInput,
  SearchAccountSchema,
  UpdateAccountInput,
  UpdateAccountStatusInput,
} from "./account.schema.js";

export const getAccountByIdS = async (id: number, userId: number) => {
  const account = await AccountRepository.getAccountById(id, userId);

  if (!account) {
    throw new AppError(404, "Account not found.");
  }
  return account;
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

  const existing = await AccountRepository.checkExistingAccount(
    userId,
    account.name,
    account.account_type,
  );

  if (existing) {
    throw new AppError(409, "Account already exists.");
  }

  return AccountRepository.createAccount(account);
};

export const updateAccountStatusS = async (
  accountId: number,
  userId: number,
  input: UpdateAccountStatusInput,
) => {
  const account = await AccountRepository.getAccountById(accountId, userId);

  if (!account) {
    throw new AppError(404, "Account not found");
  }

  if (account.status === "closed" && input.status !== "closed") {
    throw new AppError(409, "A closed account cannot be reopened.");
  }

  return AccountRepository.updateAccountStatus(accountId, userId, input.status);
};

export const getAllAccounts = async (
  userId: number,
  { status = "active", page = 1, limit = 5, search = "" }: SearchAccountSchema,
) => {
  const filter: AccountFilter = { status };

  if (search) {
    filter.search = search;
  }
  if (status !== "active") {
    filter["status"] = status;
  }

  const offset = limit * (page - 1);
  return AccountRepository.getAllAccounts(userId, filter, limit, offset);
};

export const updateAccountData = async (
  userId: number,
  accountId: number,
  data: UpdateAccountInput,
) => {
  const account = await AccountRepository.getAccountById(accountId, userId);

  if (!account) {
    throw new AppError(404, "Account not found.");
  }

  const updatedAccount = await AccountRepository.updateAccountData(
    userId,
    accountId,
    data,
  );

  if (!updatedAccount) {
    throw new AppError(404, "Account could not be updated.");
  }

  return updatedAccount;
};
