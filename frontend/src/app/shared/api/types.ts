/**
 * Shared API types for frontend and backend communication
 */

export type Status = 'success' | 'error';

export type ApiResponse<T> = {
  status: Status;
  message?: string;
  data?: T;
};

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type Account = {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
};
