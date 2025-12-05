import axios from 'axios';

const apiBase = import.meta.env.VITE_API_BASE ?? 'https://localhost:18366';

export const createApiClient = (token: string | null, tenantId: string | null) => {
  const instance = axios.create({
    baseURL: apiBase,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers = config.headers ?? {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (tenantId) {
      config.headers = config.headers ?? {};
      config.headers['X-Tenant-ID'] = tenantId;
    }
    return config;
  });

  return instance;
};

export type LoginResponse = {
  token: string;
  userName: string;
  role: string;
  tenantId: string;
};

export type Account = {
  id: string;
  tenantId: string;
  name: string;
  balance: number;
};

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  type: string;
  description: string;
};

export type Tenant = {
  id: string;
  name: string;
};
