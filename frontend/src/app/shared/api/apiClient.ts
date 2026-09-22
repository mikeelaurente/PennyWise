/**
 * Simple API client for communicating with the backend.
 *
 * Usage:
 *   const response = await apiClient<User>('/auth/login', {
 *     method: 'POST',
 *     body: { email: 'user@example.com', password: 'pass' }
 *   });
 *
 *   if (response.status === 'success') {
 *     console.log(response.data);
 *   }
 */

import type { ApiResponse } from './types';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown>;
}

/**
 * Make an API request to the backend
 * @param route - The API route (e.g., '/auth/login')
 * @param options - Optional request configuration
 * @returns Promise with the API response
 */
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
    credentials: 'include', // Include cookies for future auth
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
