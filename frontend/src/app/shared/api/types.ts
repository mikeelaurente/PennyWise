export type Status = 'success' | 'error';

export type ApiResponse<T> = {
  status: Status;
  message?: string;
  data?: T;
};
