import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import express from 'express';
import request from 'supertest';
import {
  createTransactionSchema,
  transactionQuerySchema,
  updateTransactionSchema,
} from '../../../modules/transactions/transaction.schema.js';
import { errorHandler } from '../../../shared/utils/error-handler.util.js';

const getTransactionById = jest.fn<(...args: any[]) => Promise<any>>();
const getAvailableAccount = jest.fn<(...args: any[]) => Promise<any>>();
const createTransaction = jest.fn<(...args: any[]) => Promise<any>>();
const updateTransaction = jest.fn<(...args: any[]) => Promise<any>>();
const deleteTransaction = jest.fn<(...args: any[]) => Promise<any>>();
const getAllTransactions = jest.fn<(...args: any[]) => Promise<any>>();
const getCategoryById = jest.fn<(...args: any[]) => Promise<any>>();
const isSpaceMember = jest.fn<(...args: any[]) => Promise<any>>();

jest.unstable_mockModule('../../../db/repositories/transactions.js', () => ({
  getTransactionById,
  getAvailableAccount,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransactions,
}));
jest.unstable_mockModule('../../../db/repositories/categories.js', () => ({
  getCategoryById,
  isSpaceMember,
}));
jest.unstable_mockModule('../../../shared/utils/jwt-helper.util.js', () => ({
  verifyToken: jest.fn<() => Promise<any>>().mockResolvedValue({ userId: 2 }),
}));

const service = await import('../../../modules/transactions/transaction.service.js');
const { default: routes } = await import('../../../modules/transactions/transaction.routes.js');
const app = express();
app.use(express.json());
app.use('/api/transactions', routes);
app.use(errorHandler);

const input = {
  accountId: 3,
  spaceId: 4,
  categoryId: 5,
  amount: '12.50',
  type: 'expense' as const,
};
const transaction = {
  id: 1,
  account_id: 3,
  space_id: 4,
  category_id: 5,
  amount: '12.50',
  type: 'expense',
};

beforeEach(() => {
  jest.clearAllMocks();
  getTransactionById.mockResolvedValue(transaction);
  getAvailableAccount.mockResolvedValue({ id: 3 });
  getCategoryById.mockResolvedValue({ id: 5, space_id: '4', type: 'expense' });
  isSpaceMember.mockResolvedValue(true);
  createTransaction.mockResolvedValue(transaction);
  updateTransaction.mockResolvedValue(transaction);
  deleteTransaction.mockResolvedValue(transaction);
  getAllTransactions.mockResolvedValue({ transactions: [transaction], total: 1, totalPage: 1 });
});

describe('transaction validation', () => {
  it.each(['0', '0.00', '-1', '1.001', '10000000000000', '1e2', 'NaN', ''])('rejects invalid amount %s', (amount) => {
    expect(createTransactionSchema.safeParse({ ...input, amount }).success).toBe(false);
  });

  it('accepts exact maximum amounts and optional date and category', () => {
    expect(createTransactionSchema.parse({ ...input, categoryId: null, amount: '9999999999999.99' }).amount)
      .toBe('9999999999999.99');
  });

  it('rejects transfers, numeric amounts, impossible dates and empty updates', () => {
    for (const change of [{ type: 'transfer' }, { amount: 12.5 }, { date: '2026-02-30' }]) {
      expect(createTransactionSchema.safeParse({ ...input, ...change }).success).toBe(false);
    }
    expect(updateTransactionSchema.safeParse({}).success).toBe(false);
    expect(updateTransactionSchema.safeParse({ unknown: 'value' }).success).toBe(false);
  });

  it('validates date ranges and bounded pagination', () => {
    expect(transactionQuerySchema.safeParse({ spaceId: 4, startDate: '2026-09-30', endDate: '2026-09-01' }).success).toBe(false);
    expect(transactionQuerySchema.safeParse({ spaceId: 4, limit: 91 }).success).toBe(false);
    expect(transactionQuerySchema.safeParse({}).success).toBe(false);
  });
});

describe('transaction service', () => {
  it('creates an expense with exact money and leaves the date to the database', async () => {
    await service.createTransaction(2, input);
    expect(getAvailableAccount).toHaveBeenCalledWith(3, 4, 2);
    expect(createTransaction).toHaveBeenCalledWith({
      account_id: 3,
      space_id: 4,
      category_id: 5,
      amount: '12.50',
      type: 'expense',
      reference_id: null,
      description: null,
    });
    expect(createTransaction.mock.calls[0]![0]).not.toHaveProperty('date');
  });

  it('creates income without a category', async () => {
    await service.createTransaction(2, { ...input, type: 'income', categoryId: null });
    expect(getCategoryById).not.toHaveBeenCalled();
    expect(createTransaction).toHaveBeenCalledWith(expect.objectContaining({ type: 'income', category_id: null }));
  });

  it('rejects accounts not owned by the user or unavailable in the space', async () => {
    getAvailableAccount.mockResolvedValue(undefined);
    await expect(service.createTransaction(2, input)).rejects.toMatchObject({ statusCode: 404 });
    expect(createTransaction).not.toHaveBeenCalled();
  });

  it.each([undefined, { space_id: 9, type: 'expense' }])('rejects missing or unrelated categories', async (category) => {
    getCategoryById.mockResolvedValue(category);
    await expect(service.createTransaction(2, input)).rejects.toMatchObject({ statusCode: 404 });
    expect(createTransaction).not.toHaveBeenCalled();
  });

  it('revalidates the retained category when type changes', async () => {
    await expect(service.updateTransaction(1, 2, { type: 'income' })).rejects.toMatchObject({ statusCode: 400 });
    expect(updateTransaction).not.toHaveBeenCalled();
  });

  it('revalidates the retained category when space changes', async () => {
    await expect(service.updateTransaction(1, 2, { spaceId: 9 })).rejects.toMatchObject({ statusCode: 404 });
    expect(updateTransaction).not.toHaveBeenCalled();
  });

  it('allows explicitly clearing category and description', async () => {
    await service.updateTransaction(1, 2, { categoryId: null, description: null });
    expect(updateTransaction).toHaveBeenCalledWith(1, 2, { category_id: null, description: null });
  });

  it('rejects inaccessible transaction reads and mutations', async () => {
    getTransactionById.mockResolvedValue(undefined);
    await expect(service.getTransactionById(1, 2)).rejects.toMatchObject({ statusCode: 404 });
    await expect(service.updateTransaction(1, 2, { amount: '2' })).rejects.toMatchObject({ statusCode: 404 });
    await expect(service.deleteTransaction(1, 2)).rejects.toMatchObject({ statusCode: 404 });
    expect(updateTransaction).not.toHaveBeenCalled();
    expect(deleteTransaction).not.toHaveBeenCalled();
  });

  it('checks affected rows for updates and deletes', async () => {
    updateTransaction.mockResolvedValue(undefined);
    deleteTransaction.mockResolvedValue(undefined);
    await expect(service.updateTransaction(1, 2, { amount: '2' })).rejects.toMatchObject({ statusCode: 404 });
    await expect(service.deleteTransaction(1, 2)).rejects.toMatchObject({ statusCode: 404 });
  });

  it('prevents changing or deleting one side of a transfer', async () => {
    getTransactionById.mockResolvedValue({ ...transaction, type: 'transfer' });
    await expect(service.updateTransaction(1, 2, { amount: '2' })).rejects.toMatchObject({ statusCode: 409 });
    await expect(service.deleteTransaction(1, 2)).rejects.toMatchObject({ statusCode: 409 });
  });

  it('rejects history requests from nonmembers', async () => {
    isSpaceMember.mockResolvedValue(false);
    await expect(service.getAllTransactions(2, { spaceId: 4, page: 1, limit: 10 })).rejects.toMatchObject({ statusCode: 404 });
    expect(getAllTransactions).not.toHaveBeenCalled();
  });

  it('passes history filters and pagination to the repository', async () => {
    await service.getAllTransactions(2, { spaceId: 4, page: 3, limit: 10, accountId: 3, type: 'expense' });
    expect(getAllTransactions).toHaveBeenCalledWith(2, 4, expect.objectContaining({ accountId: 3, type: 'expense' }), 10, 20);
  });

  it('propagates unexpected database failures', async () => {
    createTransaction.mockRejectedValueOnce(new Error('database unavailable'));
    await expect(service.createTransaction(2, input)).rejects.toThrow('database unavailable');
  });
});

describe('transaction routes', () => {
  it('requires authentication', async () => {
    for (const method of ['get', 'post', 'patch', 'delete'] as const) {
      const response = await request(app)[method]('/api/transactions/1');
      expect(response.status).toBe(401);
    }
  });

  it('returns 201 for create, 200 for read/update/history, and 204 for delete', async () => {
    const auth = 'Bearer test';
    expect((await request(app).post('/api/transactions').set('Authorization', auth).send(input)).status).toBe(201);
    expect((await request(app).get('/api/transactions/1').set('Authorization', auth)).status).toBe(200);
    expect((await request(app).get('/api/transactions?spaceId=4').set('Authorization', auth)).status).toBe(200);
    expect((await request(app).patch('/api/transactions/1').set('Authorization', auth).send({ amount: '3' })).status).toBe(200);
    expect((await request(app).delete('/api/transactions/1').set('Authorization', auth)).status).toBe(204);
  });

  it('returns 400 for invalid bodies, parameters and queries', async () => {
    const auth = 'Bearer test';
    expect((await request(app).post('/api/transactions').set('Authorization', auth).send({ ...input, amount: '0' })).status).toBe(400);
    expect((await request(app).get('/api/transactions/invalid').set('Authorization', auth)).status).toBe(400);
    expect((await request(app).get('/api/transactions').set('Authorization', auth)).status).toBe(400);
  });
});
