import type { Request, Response } from 'express';

import * as AccountService from './account.service.js';

import {
  createAccountSchema,
  accountQuerySchema,
  updateAccountSchema,
  updateAccountStatusSchema,
} from './account.schema.js';

import { idParamSchema } from '../../shared/schema/common.schema.js';
import { asyncHandler } from '../../shared/utils/async-handler.util.js';

export const getAllAccountsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const input = accountQuerySchema.parse(req.query);

    const accounts = await AccountService.getAllAccounts(req.user!.id, input);

    return res.status(200).json({
      status: 'ok',
      message: 'Accounts retrieved successfully.',
      data: accounts,
    });
  },
);

export const getAccountHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: accountId } = idParamSchema.parse(req.params);

    const account = await AccountService.getAccountById(
      accountId,
      req.user!.id,
    );

    return res.status(200).json({
      status: 'ok',
      message: 'Account retrieved successfully.',
      data: account,
    });
  },
);

export const createAccountHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const input = createAccountSchema.parse(req.body);

    const account = await AccountService.createAccount(req.user!.id, input);

    return res.status(201).json({
      status: 'ok',
      message: 'Account created successfully.',
      data: account,
    });
  },
);

export const updateAccountStatusHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: accountId } = idParamSchema.parse(req.params);

    const input = updateAccountStatusSchema.parse(req.body);

    const account = await AccountService.updateAccountStatus(
      accountId,
      req.user!.id,
      input,
    );

    return res.status(200).json({
      status: 'ok',
      message: 'Account status updated successfully.',
      data: account,
    });
  },
);

export const updateAccountDataHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: accountId } = idParamSchema.parse(req.params);

    const input = updateAccountSchema.parse(req.body);

    const account = await AccountService.updateAccountData(
      req.user!.id,
      accountId,
      input,
    );

    return res.status(200).json({
      status: 'ok',
      message: 'Account data updated successfully.',
      data: account,
    });
  },
);
