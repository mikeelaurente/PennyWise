import type { RegisterInput, LoginUserInput } from './auth.schema.js';
import * as userRepository from '../../db/repositories/user.repository.js';
import { AppError } from '../../shared/utils/app-error.util.js';
import { compareHashed, hashValue } from '../../shared/utils/bcrypt.util.js';
import * as jwtHelper from '../../shared/utils/jwt-helper.util.js';

export async function registerUser(input: RegisterInput) {
  const email = input.email.trim().toLowerCase();
  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new AppError(409, 'User already exists');
  }

  const hashedPassword = await hashValue(input.password);

  const addUser = await userRepository.createUser({
    name: input.name,
    email,
    password_hash: hashedPassword,
  });

  if (!addUser) {
    throw new AppError(500, 'Failed to create user');
  }

  const accessToken = await jwtHelper.generateToken(addUser.id);

  return {
    accessToken,
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
    throw new AppError(404, 'User not found');
  }

  if (!(await compareHashed(userData.password, user.password_hash))) {
    throw new AppError(401, 'Invalid credentials');
  }

  const accessToken = await jwtHelper.generateToken(user.id);

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};
