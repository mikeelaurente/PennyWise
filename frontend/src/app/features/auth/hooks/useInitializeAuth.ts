import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import apiClient from '../../../shared/api/apiClient';
import type { AuthUser } from '../types';

export function useInitializeAuth() {
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const refreshToken = useAuthStore
          .getState()
          .loadRefreshTokenFromStorage();

        if (!refreshToken) {
          useAuthStore.getState().setAuthInitialized(true);
          return;
        }

        const refreshResponse = await apiClient<{
          accessToken: string;
          refreshToken: string;
        }>('/auth/refresh', {
          method: 'POST',
          body: { refreshToken },
        });

        if (refreshResponse.status !== 'success' || !refreshResponse.data) {
          useAuthStore.getState().clearAuth();
          useAuthStore.getState().setAuthInitialized(true);
          return;
        }

        const { accessToken, refreshToken: newRefreshToken } =
          refreshResponse.data;

        useAuthStore.getState().setTemporaryAccessToken(accessToken);

        const meResponse = await apiClient<{
          user: {
            id: number;
            email: string;
            name: string;
          };
        }>('/auth/me', {
          method: 'GET',
        });

        if (meResponse.status === 'success' && meResponse.data?.user) {
          const { user } = meResponse.data;
          const normalizedUser: AuthUser = {
            id: String(user.id),
            name: user.name,
            email: user.email,
          };
          useAuthStore
            .getState()
            .setAuth(normalizedUser, accessToken, newRefreshToken);
        } else {
          useAuthStore.getState().clearAuth();
        }
      } catch {
        useAuthStore.getState().clearAuth();
      } finally {
        useAuthStore.getState().setAuthInitialized(true);
      }
    };

    initializeAuth();
  }, []);
}
