import type { Request, Response } from 'express';
import * as CategoryService from './category.service.js';
import {
  categoryQuerySchema,
  createCategorySchema,
  updateCategorySchema,
} from './category.schema.js';
import { idParamSchema } from '../../shared/schema/common.schema.js';
import { asyncHandler } from '../../shared/utils/async-handler.util.js';

export const getAllCategoriesHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const input = categoryQuerySchema.parse(req.query);
    const categories = await CategoryService.getAllCategories(
      req.user!.id,
      input,
    );

    return res.status(200).json({
      status: 'ok',
      message: 'Categories retrieved successfully.',
      data: categories,
    });
  },
);

export const getCategoryHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = idParamSchema.parse(req.params);
    const category = await CategoryService.getCategoryById(id, req.user!.id);

    return res.status(200).json({
      status: 'ok',
      message: 'Category retrieved successfully.',
      data: category,
    });
  },
);

export const createCategoryHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const input = createCategorySchema.parse(req.body);
    const category = await CategoryService.createCategory(req.user!.id, input);

    return res.status(201).json({
      status: 'ok',
      message: 'Category created successfully.',
      data: category,
    });
  },
);

export const updateCategoryHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = idParamSchema.parse(req.params);
    const input = updateCategorySchema.parse(req.body);
    const category = await CategoryService.updateCategory(
      id,
      req.user!.id,
      input,
    );

    return res.status(200).json({
      status: 'ok',
      message: 'Category updated successfully.',
      data: category,
    });
  },
);

export const deleteCategoryHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = idParamSchema.parse(req.params);
    await CategoryService.deleteCategory(id, req.user!.id);

    return res.status(204).send();
  },
);
