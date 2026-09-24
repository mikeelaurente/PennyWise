/**
 * User type for general use throughout the app
 */
export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * AuthUser type - the normalized user from login response
 * Matches what we store in Zustand after normalizing from backend
 */
export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

/**
 * Backend login response - matches actual /auth/login endpoint
 */
export type BackendAuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

/**
 * Login response wrapper from API
 */
export type LoginResponse = {
  status: 'success' | 'error';
  message?: string;
  data?: BackendAuthResponse;
};
