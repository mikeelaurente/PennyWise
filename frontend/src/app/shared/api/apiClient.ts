import type { ApiResponse } from './types';

type ApiOptions = {
  method?: string;
  body?: unknown;
};

async function apiClient<T>(route: string, { method, body }: ApiOptions = {}) {
  const response = await fetch(`/api${route}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return response.json() as Promise<ApiResponse<T>>;
}

export default apiClient;
