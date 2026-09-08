import { NextFunction, Request, Response } from "express";
import * as AccountService from "./account.service.js";
import {
  createAccountSchema,
  searchAccountSchema,
  updateAccountStatusSchema,
} from "./account.schema.js";
import { success } from "zod";

export const getAccountHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const accounts = await AccountService.getAccountByIdS(id, req.user!.id);

    return res.status(200).json({
      status: "ok",
      message: "Accounts retrieved successfully.",
      data: accounts,
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
    const data = createAccountSchema.parse(req.body);
    const userId = req.user!.id;

    const account = await AccountService.createAccountS(userId, data);

    return res.status(200).json({
      status: "ok",
      message: "Account created successfully",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAccountsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = searchAccountSchema.parse(req.query);
    const accounts = await AccountService.getAllAccounts(req.user!.id, data);

    return res.status(200).json({
      status: "ok",
      message: "Account retrieved successfully.",
      data: accounts,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAccountStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accountId = Number(req.params.id);
    const userId = req.user!.id;

    const input = updateAccountStatusSchema.parse(req.body);
    const account = await AccountService.updateAccountStatusS(
      accountId,
      userId,
      input,
    );
    return res.status(200).json({
      status: "ok",
      message: "Account status updated successfully.",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAccountDataHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accountId = Number(req.params.id);
    const userId = req.user!.id;
    const data = createAccountSchema.parse(req.body);

    const account = await AccountService.updateAccountData(
      userId,
      accountId,
      data,
    );
    return res.status(200).json({
      status: "ok",
      message: "Account data updated successfully.",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};
