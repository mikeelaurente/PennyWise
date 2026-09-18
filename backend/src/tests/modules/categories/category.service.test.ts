import { beforeEach, describe, expect, it, jest } from '@jest/globals';

const mockedGetCategoryById =
  jest.fn<(id: number, userId: number) => Promise<any>>();
const mockedCheckExistingCategory =
  jest.fn<
    (
      spaceId: number,
      name: string,
      type: string,
      excludedId?: number,
    ) => Promise<any>
  >();
const mockedUpdateCategory =
  jest.fn<(id: number, data: Record<string, unknown>) => Promise<any>>();

jest.unstable_mockModule('../../../db/repositories/categories.js', () => ({
  getCategoryById: mockedGetCategoryById,
  checkExistingCategory: mockedCheckExistingCategory,
  updateCategory: mockedUpdateCategory,
  deleteCategory: jest.fn(),
  isSpaceMember: jest.fn(),
  createCategory: jest.fn(),
}));

const { updateCategory } =
  await import('../../../modules/categories/category.service.js');

describe('category service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not run duplicate checks for a status-only update', async () => {
    mockedGetCategoryById.mockResolvedValue({
      id: 1,
      space_id: 12,
      name: 'Groceries',
      type: 'expense',
      status: 'active',
      is_default: false,
      created_at: new Date(),
    });

    mockedUpdateCategory.mockResolvedValue({
      id: 1,
      space_id: 12,
      name: 'Groceries',
      type: 'expense',
      status: 'archived',
      is_default: false,
      created_at: new Date(),
    });

    await expect(
      updateCategory(1, 2, { status: 'archived' }),
    ).resolves.toMatchObject({
      status: 'archived',
    });

    expect(mockedCheckExistingCategory).not.toHaveBeenCalled();
  });

  it('rejects reopening a closed category', async () => {
    mockedGetCategoryById.mockResolvedValue({
      id: 1,
      space_id: 12,
      name: 'Groceries',
      type: 'expense',
      status: 'closed',
      is_default: false,
      created_at: new Date(),
    });

    await expect(
      updateCategory(1, 2, { status: 'active' }),
    ).rejects.toMatchObject({
      statusCode: 409,
      message: 'A closed category cannot be reopened.',
    });

    expect(mockedUpdateCategory).not.toHaveBeenCalled();
  });
});
