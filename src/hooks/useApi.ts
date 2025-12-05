import { useMemo } from 'react';
import { createApiClient } from '../api/client';
import { useAuth } from '../state/AuthContext';

export const useApi = () => {
  const { token, user } = useAuth();
  const client = useMemo(
    () => createApiClient(token, user?.tenantId ?? null),
    [token, user?.tenantId]
  );
  return client;
};
