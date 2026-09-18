import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  CreatedUser,
  RegisterInput,
  NewUser,
} from '../../types/auth/register.type.js';

const mockedFindUserByEmail =
  jest.fn<(email: string) => Promise<CreatedUser | undefined>>();

const mockedCreateUser =
  jest.fn<(user: NewUser) => Promise<CreatedUser | undefined>>();

const mockedGenerateToken = jest.fn<(userId: number) => Promise<string>>();

jest.unstable_mockModule('../../../db/repositories/user.repository.js', () => ({
  findUserByEmail: mockedFindUserByEmail,
  createUser: mockedCreateUser,
}));

jest.unstable_mockModule('../../../shared/utils/jwt-helper.util.js', () => ({
  generateToken: mockedGenerateToken,
  verifyToken: jest.fn(),
}));

const { registerUser } = await import('../../../modules/auth/auth.service.js');

describe('registerUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedFindUserByEmail.mockResolvedValue(undefined);

    mockedCreateUser.mockResolvedValue({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      created_at: new Date(),
      updated_at: new Date(),
    });

    mockedGenerateToken.mockResolvedValue('test-access-token');
  });

  it('hashes the password before saving the user', async () => {
    const input: RegisterInput = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await registerUser(input);

    const savedUser = mockedCreateUser.mock.calls[0]?.[0];

    expect(savedUser).toBeDefined();

    if (!savedUser) {
      throw new Error('createUser was not called');
    }

    expect(savedUser.name).toBe(input.name);
    expect(savedUser.email).toBe(input.email);
    expect(savedUser.password_hash).not.toBe(input.password);

    const passwordMatches = await bcrypt.compare(
      input.password,
      savedUser.password_hash,
    );

    expect(passwordMatches).toBe(true);

    expect(result).toEqual({
      accessToken: 'test-access-token',
      user: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      },
    });

    expect(mockedGenerateToken).toHaveBeenCalledWith(1);
  });

  it('rejects an already registered email', async () => {
    mockedFindUserByEmail.mockResolvedValue({
      id: 1,
      name: 'Existing User',
      email: 'test@example.com',
      password_hash: 'existing-hash',
      created_at: new Date(),
      updated_at: new Date(),
    });

    await expect(
      registerUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      }),
    ).rejects.toMatchObject({
      statusCode: 409,
      message: 'User already exists',
    });

    expect(mockedCreateUser).not.toHaveBeenCalled();
    expect(mockedGenerateToken).not.toHaveBeenCalled();
  });
});
