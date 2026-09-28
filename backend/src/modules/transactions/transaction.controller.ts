import type { Request, Response } from 'express';
import * as TransactionService from './transaction.service.js';
import {
  transactionQuerySchema,
  createTransactionSchema,
  updateTransactionSchema,
} from './transaction.schema.js';
import { idParamSchema } from '../../shared/schema/common.schema.js';
import { asyncHandler } from '../../shared/utils/async-handler.util.js';

export const getAllTransactionsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const input = transactionQuerySchema.parse(req.query);
    const transactions = await TransactionService.getAllTransactions(
      req.user!.id,
      input,
    );

    return res.status(200).json({
      status: 'ok',
      message: 'Transactions retrieved successfully.',
      data: transactions,
    });
  },
);

export const getTransactionHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = idParamSchema.parse(req.params);
    const transaction = await TransactionService.getTransactionById(
      id,
      req.user!.id,
    );

    return res.status(200).json({
      status: 'ok',
      message: 'Transaction retrieved successfully.',
      data: transaction,
    });
  },
);

export const createTransactionHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const input = createTransactionSchema.parse(req.body);
    const transaction = await TransactionService.createTransaction(
      req.user!.id,
      input,
    );

    return res.status(201).json({
      status: 'ok',
      message: 'Transaction created successfully.',
      data: transaction,
    });
  },
);

export const updateTransactionHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = idParamSchema.parse(req.params);
    const input = updateTransactionSchema.parse(req.body);
    const transaction = await TransactionService.updateTransaction(
      id,
      req.user!.id,
      input,
    );

    return res.status(200).json({
      status: 'ok',
      message: 'Transaction updated successfully.',
      data: transaction,
    });
  },
);

export const deleteTransactionHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = idParamSchema.parse(req.params);
    await TransactionService.deleteTransaction(id, req.user!.id);

    return res.status(204).send();
  },
);

