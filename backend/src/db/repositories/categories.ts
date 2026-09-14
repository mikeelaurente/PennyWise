import { db } from '../index.js';
import type {
  CategoryType,
  CategoryUpdate,
  NewCategory,
} from '../types/categories.js';

export type CategoryFilter = {
  search?: string;
  type?: CategoryType;
};

export const getAllCategories = async (
  userId: number,
  spaceId: number,
  filter: CategoryFilter,
  limit: number,
  offset: number,
) => {
  let query = db
    .selectFrom('categories')
    .innerJoin('space_members', 'space_members.space_id', 'categories.space_id')
    .select([
      'categories.id',
      'categories.space_id',
      'categories.name',
      'categories.type',
      'categories.is_default',
      'categories.created_at',
    ])
    .where('space_members.user_id', '=', userId)
    .where('categories.space_id', '=', spaceId);

  let countQuery = db
    .selectFrom('categories')
    .innerJoin('space_members', 'space_members.space_id', 'categories.space_id')
    .select(({ fn }) => fn.count('categories.id').as('total'))
    .where('space_members.user_id', '=', userId)
    .where('categories.space_id', '=', spaceId);

  if (filter.search) {
    const search = `%${filter.search}%`;
    query = query.where('categories.name', 'ilike', search);
    countQuery = countQuery.where('categories.name', 'ilike', search);
  }

  if (filter.type) {
    query = query.where('categories.type', '=', filter.type);
    countQuery = countQuery.where('categories.type', '=', filter.type);
  }

  const categories = await query
    .orderBy('categories.name', 'asc')
    .limit(limit)
    .offset(offset)
    .execute();

  const countResult = await countQuery.executeTakeFirst();
  const total = Number(countResult?.total ?? 0);

  return {
    categories,
    total,
    totalPage: Math.ceil(total / limit),
  };
};

export const getCategoryById = async (id: number, userId: number) => {
  return db
    .selectFrom('categories')
    .innerJoin('space_members', 'space_members.space_id', 'categories.space_id')
    .select([
      'categories.id',
      'categories.space_id',
      'categories.name',
      'categories.type',
      'categories.is_default',
      'categories.created_at',
    ])
    .where('categories.id', '=', id)
    .where('space_members.user_id', '=', userId)
    .executeTakeFirst();
};

export const isSpaceMember = async (userId: number, spaceId: number) => {
  const member = await db
    .selectFrom('space_members')
    .select('space_id')
    .where('space_members.user_id', '=', userId)
    .where('space_members.space_id', '=', spaceId)
    .executeTakeFirst();
  return !!member;
};

export const checkExistingCategory = async (
  spaceId: number,
  name: string,
  type: CategoryType,
  excludedId?: number,
) => {
  let query = db
    .selectFrom('categories')
    .select('id')
    .where('space_id', '=', spaceId)
    .where('name', '=', name)
    .where('type', '=', type);

  if (excludedId !== undefined) {
    query = query.where('id', '!=', excludedId);
  }

  return query.executeTakeFirst();
};

export const createCategory = async (category: NewCategory) => {
  return db
    .insertInto('categories')
    .values(category)
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const updateCategory = async (id: number, data: CategoryUpdate) => {
  return db
    .updateTable('categories')
    .set(data)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
};

export const deleteCategory = async (id: number) => {
  return db
    .deleteFrom('categories')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
};
