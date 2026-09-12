import { db } from '../index.js';
import { NewSpace } from '../types/spaces.js';

export const getSpaceById = async (id: number) => {
  return await db
    .selectFrom('spaces')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
};

export const createSpace = async (space: NewSpace) => {
  return await db.insertInto('spaces').values(space).executeTakeFirst();
};

export const getAllCreatedSpacesByUser = async (userId: number) => {
  return await db
    .selectFrom('spaces')
    .selectAll()
    .where('created_by_user_id', '=', userId)
    .execute();
};

export const updateSpace = async (
  id: number,
  space: { name: string; spaceType: string },
) => {
  return await db
    .updateTable('spaces')
    .set(space)
    .where('id', '=', id)
    .executeTakeFirst();
};

export const deleteSpaceById = async (id: number) => {
  return await db.deleteFrom('spaces').where('id', '=', id).executeTakeFirst();
};
