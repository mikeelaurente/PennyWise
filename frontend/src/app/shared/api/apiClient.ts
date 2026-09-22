import type { ApiResponse } from './types';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown>;
}

async function apiClient<T>(
  route: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const { method = 'GET', body } = options;

  const url = `/api${route}`;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    if (!response.ok) {
      return {
        status: 'error',
        message: data.message || `HTTP ${response.status}`,
      };
    }

    return data as ApiResponse<T>;
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export default apiClient;
