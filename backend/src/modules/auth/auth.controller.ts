import { Response, Request, NextFunction } from 'express';
import * as authServices from './auth.service.js';
import { registerSchema, loginUserSchema } from './auth.schema.js';
import { AppError } from '../../shared/utils/app-error.util.js';

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await authServices.getMe(req.user!.id);

    return res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = registerSchema.parse(req.body);

    const result = await authServices.registerUser(data);

    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const credentials = loginUserSchema.parse(req.body);

    const data = await authServices.loginUser(credentials);

    return res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
