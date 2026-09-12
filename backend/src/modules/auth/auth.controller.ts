import type { Response, Request } from 'express';
import * as authServices from './auth.service.js';
import {
  registerSchema,
  loginUserSchema,
  refreshTokenSchema,
} from './auth.schema.js';
import { asyncHandler } from '../../shared/utils/async-handler.util.js';

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await authServices.getMe(req.user!.id);

  return res.status(200).json({
    status: 'success',
    data: { user },
  });
});

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const data = registerSchema.parse(req.body);

    const result = await authServices.registerUser(data);

    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: result,
    });
  },
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const credentials = loginUserSchema.parse(req.body);

  const data = await authServices.loginUser(credentials);

  return res.status(200).json({
    status: 'success',
    message: 'User logged in successfully',
    data,
  });
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  await authServices.logoutUser(req.user!.id);

  return res.status(200).json({
    status: 'success',
    message: 'User logged out successfully',
  });
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = refreshTokenSchema.parse(req.body);

    const data = await authServices.refreshToken(refreshToken);

    return res.status(200).json({
      status: 'success',
      message: 'Token refreshed successfully',
      data,
    });
  },
);
