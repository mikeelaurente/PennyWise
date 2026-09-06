import { db } from '../index.js';
import { NewUser } from '../types/users.js';

export const findUserByEmail = async (email: string) => {
  return await db
    .selectFrom('users')
    .where('email', '=', email)
    .executeTakeFirst();
};

export const createUser = async (user: NewUser) => {
  return db
    .insertInto('users')
    .values(user)
    .returning(['id', 'name', 'email', 'created_at', 'updated_at'])
    .executeTakeFirst();
};
