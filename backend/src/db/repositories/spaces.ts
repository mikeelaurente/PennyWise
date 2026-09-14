import { db } from '../index.js';
import type {
  NewSpace,
  SpaceRole,
  SpaceType,
  SpaceUpdate,
} from '../types/spaces.js';

export type SpaceFilter = {
  search?: string;
  type?: SpaceType;
};

const spaceColumns = [
  'spaces.id',
  'spaces.name',
  'spaces.type',
  'spaces.created_by_user_id',
  'spaces.created_at',
] as const;

export const getAllSpaces = async (
  userId: number,
  filter: SpaceFilter,
  limit: number,
  offset: number,
) => {
  let query = db
    .selectFrom('spaces')
    .innerJoin('space_members', 'space_members.space_id', 'spaces.id')
    .select(spaceColumns)
    .where('space_members.user_id', '=', userId);

  let countQuery = db
    .selectFrom('spaces')
    .innerJoin('space_members', 'space_members.space_id', 'spaces.id')
    .select(({ fn }) => fn.count('spaces.id').as('total'))
    .where('space_members.user_id', '=', userId);

  if (filter.search) {
    const search = `%${filter.search}%`;
    query = query.where('spaces.name', 'ilike', search);
    countQuery = countQuery.where('spaces.name', 'ilike', search);
  }

  if (filter.type) {
    query = query.where('spaces.type', '=', filter.type);
    countQuery = countQuery.where('spaces.type', '=', filter.type);
  }

  const spaces = await query
    .orderBy('spaces.created_at', 'desc')
    .limit(limit)
    .offset(offset)
    .execute();
  const countResult = await countQuery.executeTakeFirst();
  const total = Number(countResult?.total ?? 0);

  return {
    spaces,
    total,
    totalPage: Math.ceil(total / limit),
  };
};

export const getSpaceById = async (spaceId: number, userId: number) => {
  return db
    .selectFrom('spaces')
    .innerJoin('space_members', 'space_members.space_id', 'spaces.id')
    .select([...spaceColumns, 'space_members.role'])
    .where('spaces.id', '=', spaceId)
    .where('space_members.user_id', '=', userId)
    .executeTakeFirst();
};

export const getSpace = async (spaceId: number) => {
  return db
    .selectFrom('spaces')
    .select(spaceColumns)
    .where('spaces.id', '=', spaceId)
    .executeTakeFirst();
};

export const createSpace = async (space: NewSpace, userId: number) => {
  return db.transaction().execute(async (transaction) => {
    const createdSpace = await transaction
      .insertInto('spaces')
      .values(space)
      .returningAll()
      .executeTakeFirstOrThrow();

    await transaction
      .insertInto('space_members')
      .values({
        space_id: createdSpace.id,
        user_id: userId,
        role: 'owner',
      })
      .executeTakeFirstOrThrow();

    return createdSpace;
  });
};

export const updateSpace = async (spaceId: number, data: SpaceUpdate) => {
  return db
    .updateTable('spaces')
    .set(data)
    .where('id', '=', spaceId)
    .returningAll()
    .executeTakeFirst();
};

export const getMembership = async (spaceId: number, userId: number) => {
  return db
    .selectFrom('space_members')
    .select(['space_id', 'user_id', 'role'])
    .where('space_id', '=', spaceId)
    .where('user_id', '=', userId)
    .executeTakeFirst();
};

export const getMembers = async (spaceId: number) => {
  return db
    .selectFrom('space_members')
    .innerJoin('users', 'users.id', 'space_members.user_id')
    .select([
      'space_members.space_id',
      'space_members.user_id',
      'space_members.role',
      'users.name',
      'users.email',
    ])
    .where('space_members.space_id', '=', spaceId)
    .orderBy('space_members.role', 'asc')
    .orderBy('users.name', 'asc')
    .execute();
};

export const addMember = async (
  spaceId: number,
  userId: number,
  role: SpaceRole = 'member',
) => {
  return db
    .insertInto('space_members')
    .values({ space_id: spaceId, user_id: userId, role })
    .returningAll()
    .executeTakeFirst();
};

export const updateMemberRole = async (
  spaceId: number,
  userId: number,
  role: SpaceRole,
) => {
  return db
    .updateTable('space_members')
    .set({ role })
    .where('space_id', '=', spaceId)
    .where('user_id', '=', userId)
    .returningAll()
    .executeTakeFirst();
};

export const removeMember = async (spaceId: number, userId: number) => {
  return db
    .deleteFrom('space_members')
    .where('space_id', '=', spaceId)
    .where('user_id', '=', userId)
    .returningAll()
    .executeTakeFirst();
};

export const getUser = async (userId: number) => {
  return db
    .selectFrom('users')
    .select('id')
    .where('id', '=', userId)
    .executeTakeFirst();
};

export const getAccount = async (accountId: number, userId: number) => {
  return db
    .selectFrom('accounts')
    .select(['id', 'user_id'])
    .where('id', '=', accountId)
    .where('user_id', '=', userId)
    .executeTakeFirst();
};

export const getSpaceAccount = async (spaceId: number, accountId: number) => {
  return db
    .selectFrom('space_accounts')
    .select(['space_id', 'account_id'])
    .where('space_id', '=', spaceId)
    .where('account_id', '=', accountId)
    .executeTakeFirst();
};

export const addAccount = async (spaceId: number, accountId: number) => {
  return db
    .insertInto('space_accounts')
    .values({ space_id: spaceId, account_id: accountId })
    .returningAll()
    .executeTakeFirst();
};

export const removeAccount = async (spaceId: number, accountId: number) => {
  return db
    .deleteFrom('space_accounts')
    .where('space_id', '=', spaceId)
    .where('account_id', '=', accountId)
    .returningAll()
    .executeTakeFirst();
};
