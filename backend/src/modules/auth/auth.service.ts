import type { RegisterInput, LoginUserInput } from './auth.schema.js';
import * as userRepository from '../../db/repositories/users.js';
import * as refreshTokenRepository from '../../db/repositories/refreshToken.js';
import { AppError } from '../../shared/utils/app-error.util.js';
import { compareHashed, hashValue } from '../../shared/utils/bcrypt.util.js';
import * as jwtHelper from '../../shared/utils/jwt-helper.util.js';
import {
  generateRefreshToken,
  hashRefreshToken,
} from '../../shared/utils/refresh-token.util.js';
import { env } from '../../config/env.js';

export async function registerUser(input: RegisterInput) {
  const email = input.email.trim().toLowerCase();
  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new AppError(409, 'User already exists');
  }

  const hashedPassword = await hashValue(input.password);

  const addUser = await userRepository.registerUser({
    name: input.name,
    email,
    password_hash: hashedPassword,
  });

  if (!addUser) {
    throw new AppError(500, 'Failed to create user');
  }

  const accessToken = await jwtHelper.generateToken(addUser.id);

  const refreshToken = await createUserRefreshToken(addUser.id);

  return {
    accessToken,
    refreshToken,
    user: {
      id: addUser.id,
      name: addUser.name,
      email: addUser.email,
    },
  };
}

export const getMe = async (id: number) => {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};

export const loginUser = async (userData: LoginUserInput) => {
  const email = userData.email.trim().toLowerCase();
  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    throw new AppError(401, 'Invalid credentials');
  }

  if (!(await compareHashed(userData.password, user.password_hash))) {
    throw new AppError(401, 'Invalid credentials');
  }

  const accessToken = await jwtHelper.generateToken(user.id);
  const refreshToken = await createUserRefreshToken(user.id);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export const logoutUser = async (id: number) => {
  await refreshTokenRepository.revokeUserRefreshTokens(id);
};

const createUserRefreshToken = async (userId: number) => {
  const rawToken = generateRefreshToken();

  const tokenHash = hashRefreshToken(rawToken);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + env.JWT_REFRESH_EXPIRATION_IN_DAYS);

  await refreshTokenRepository.createRefreshToken({
    user_id: userId,
    token_hash: tokenHash,
    expires_at: expiresAt,
  });

  return rawToken;
};

export const refreshToken = async (token: string) => {
  const tokenHash = hashRefreshToken(token);

  const storedToken = await refreshTokenRepository.findRefreshToken(tokenHash);

  if (!storedToken) {
    throw new AppError(401, 'Refresh token not found');
  }

  if (storedToken.revoked_at) {
    throw new AppError(401, 'Refresh token has been revoked');
  }

  if (storedToken.expires_at <= new Date()) {
    throw new AppError(401, 'Refresh token has expired');
  }

  await refreshTokenRepository.revokeRefreshToken(storedToken.id);

  const accessToken = await jwtHelper.generateToken(storedToken.user_id);

  const newRefreshToken = await createUserRefreshToken(storedToken.user_id);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};
