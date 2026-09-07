import { NextFunction, Request, Response } from 'express';
import * as AccountService from './account.service.js';

export const getAccountHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const category = await AccountService.getAccountByIdS(id, id);

    return res.status(200).json({
      status: 'ok',
      message: 'Category retrieved successfully.',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const createAccountHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    next(error);
  }
};
