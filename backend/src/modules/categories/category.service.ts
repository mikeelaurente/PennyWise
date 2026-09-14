import * as CategoryRepository from '../../db/repositories/categories.js';
import { AppError } from '../../shared/utils/app-error.util.js';
import type {
  CategoryQueryParams,
  CreateCategoryInput,
  UpdateCategoryInput,
} from './category.schema.js';

export const getAllCategories = async (
  userId: number,
  { spaceId, search, type, page, limit }: CategoryQueryParams,
) => {
  const offset = limit * (page - 1);

  return CategoryRepository.getAllCategories(
    userId,
    spaceId,
    { search, type },
    limit,
    offset,
  );
};

export const getCategoryById = async (id: number, userId: number) => {
  const category = await CategoryRepository.getCategoryById(id, userId);

  if (!category) {
    throw new AppError(404, 'Category not found.');
  }

  return category;
};

export const createCategory = async (
  userId: number,
  input: CreateCategoryInput,
) => {
  const isMember = await CategoryRepository.isSpaceMember(
    userId,
    input.spaceId,
  );

  if (!isMember) {
    throw new AppError(404, 'Space not found.');
  }

  const existing = await CategoryRepository.checkExistingCategory(
    input.spaceId,
    input.name,
    input.type,
  );

  if (existing) {
    throw new AppError(409, 'Category already exists.');
  }

  return CategoryRepository.createCategory({
    space_id: input.spaceId,
    name: input.name,
    type: input.type,
  });
};

export const updateCategory = async (
  id: number,
  userId: number,
  input: UpdateCategoryInput,
) => {
  const category = await getCategoryById(id, userId);

  if (input.name !== undefined || input.type !== undefined) {
    const existing = await CategoryRepository.checkExistingCategory(
      category.space_id,
      input.name ?? category.name,
      input.type ?? category.type,
      id,
    );

    if (existing) {
      throw new AppError(409, 'Category already exists.');
    }
  }

  const updatedCategory = await CategoryRepository.updateCategory(id, {
    ...(input.name !== undefined && { name: input.name }),
    ...(input.type !== undefined && { type: input.type }),
  });

  if (!updatedCategory) {
    throw new AppError(404, 'Category not found.');
  }

  return updatedCategory;
};

export const deleteCategory = async (id: number, userId: number) => {
  await getCategoryById(id, userId);

  const deletedCategory = await CategoryRepository.deleteCategory(id);

  if (!deletedCategory) {
    throw new AppError(404, 'Category not found.');
  }
};
