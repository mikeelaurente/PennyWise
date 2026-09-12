import { db } from '../index.js';
import type { NewRefreshToken } from '../types/refreshTokens.js';

export const createRefreshToken = async (token: NewRefreshToken) => {
  return db
    .insertInto('refresh_tokens')
    .values(token)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const findRefreshToken = async (tokenHash: string) => {
  return db
    .selectFrom('refresh_tokens')
    .selectAll()
    .where('token_hash', '=', tokenHash)
    .executeTakeFirst();
};

export const revokeUserRefreshTokens = async (id: number) => {
  return db
    .updateTable('refresh_tokens')
    .set({ revoked_at: new Date() })
    .where('user_id', '=', id)
    .executeTakeFirst();
};
