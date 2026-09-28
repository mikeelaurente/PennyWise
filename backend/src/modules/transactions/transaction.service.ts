import * as TransactionRepository from '../../db/repositories/transactions.js';
import * as CategoryRepository from '../../db/repositories/categories.js';
import { AppError } from '../../shared/utils/app-error.util.js';
import type {
  CreateTransactionInput,
  TransactionQueryParams,
  UpdateTransactionInput,
} from './transaction.schema.js';

const validateRelationships = async (
  userId: number,
  accountId: number,
  spaceId: number,
  categoryId: number | null,
  type: string,
) => {
  const account = await TransactionRepository.getAvailableAccount(
    accountId,
    spaceId,
    userId,
  );

  if (!account) {
    throw new AppError(404, 'Account not found in this space.');
  }

  if (categoryId !== null) {
    const category = await CategoryRepository.getCategoryById(categoryId, userId);

    if (!category || String(category.space_id) !== String(spaceId)) {
      throw new AppError(404, 'Category not found in this space.');
    }

    if (category.type !== type) {
      throw new AppError(400, 'Category type must match transaction type.');
    }
  }
};

export const getAllTransactions = async (
  userId: number,
  {
    spaceId,
    accountId,
    categoryId,
    search,
    type,
    startDate,
    endDate,
    page,
    limit,
  }: TransactionQueryParams,
) => {
  const isMember = await CategoryRepository.isSpaceMember(userId, spaceId);

  if (!isMember) {
    throw new AppError(404, 'Space not found.');
  }

  const offset = limit * (page - 1);

  return TransactionRepository.getAllTransactions(
    userId,
    spaceId,
    { accountId, categoryId, search, type, startDate, endDate },
    limit,
    offset,
  );
};

export const getTransactionById = async (id: number, userId: number) => {
  const transaction = await TransactionRepository.getTransactionById(id, userId);

  if (!transaction) {
    throw new AppError(404, 'Transaction not found.');
  }

  return transaction;
};

export const createTransaction = async (
  userId: number,
  input: CreateTransactionInput,
) => {
  await validateRelationships(
    userId,
    input.accountId,
    input.spaceId,
    input.categoryId ?? null,
    input.type,
  );

  return TransactionRepository.createTransaction({
    account_id: input.accountId,
    space_id: input.spaceId,
    category_id: input.categoryId ?? null,
    reference_id: null,
    amount: input.amount,
    type: input.type,
    ...(input.date !== undefined && { date: input.date }),
    description: input.description ?? null,
  });
};

export const updateTransaction = async (
  id: number,
  userId: number,
  input: UpdateTransactionInput,
) => {
  const transaction = await getTransactionById(id, userId);

  if (transaction.type === 'transfer') {
    throw new AppError(409, 'Transfers cannot be updated through this endpoint.');
  }

  await validateRelationships(
    userId,
    input.accountId ?? transaction.account_id,
    input.spaceId ?? transaction.space_id,
    input.categoryId !== undefined ? input.categoryId : transaction.category_id,
    input.type ?? transaction.type,
  );

  const updatedTransaction = await TransactionRepository.updateTransaction(
    id,
    userId,
    {
      ...(input.accountId !== undefined && { account_id: input.accountId }),
      ...(input.spaceId !== undefined && { space_id: input.spaceId }),
      ...(input.categoryId !== undefined && { category_id: input.categoryId }),
      ...(input.amount !== undefined && { amount: input.amount }),
      ...(input.type !== undefined && { type: input.type }),
      ...(input.date !== undefined && { date: input.date }),
      ...(input.description !== undefined && { description: input.description }),
    },
  );

  if (!updatedTransaction) {
    throw new AppError(404, 'Transaction not found.');
  }

  return updatedTransaction;
};

export const deleteTransaction = async (id: number, userId: number) => {
  const transaction = await getTransactionById(id, userId);

  if (transaction.type === 'transfer') {
    throw new AppError(409, 'Transfers cannot be deleted through this endpoint.');
  }

  const deletedTransaction = await TransactionRepository.deleteTransaction(
    id,
    userId,
  );

  if (!deletedTransaction) {
    throw new AppError(404, 'Transaction not found.');
  }
};
