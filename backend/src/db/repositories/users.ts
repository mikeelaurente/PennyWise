import { db } from '../index.js';
import type { NewUser } from '../types/users.js';

export const findUserByEmail = async (email: string) => {
  return await db
    .selectFrom('users')
    .selectAll()
    .where('email', '=', email)
    .executeTakeFirst();
};

export const registerUser = async (user: NewUser) => {
  return db
    .insertInto('users')
    .values(user)
    .returning(['id', 'name', 'email', 'created_at', 'updated_at'])
    .executeTakeFirst();
};

export const findUserById = async (id: number) => {
  return db
    .selectFrom('users')
    .selectAll()
    .where('users.id', '=', id)
    .executeTakeFirst();
};
