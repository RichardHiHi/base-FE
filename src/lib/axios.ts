import STATUS from '@/components/constants/statusCode';
import { PAGE_ROUTES } from '@/routers/routes';
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { type refreshTokenResponse } from '../api/auth';
import { AUTH } from '../constants/endpoints';
import { LOCAL_STORAGE } from './utils';
import { toast } from 'sonner';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let subscribers: any[] = [];

instance.interceptors.response.use(
  (response) => {
    const successMessage = response.data.message;
    if (successMessage) {
      toast.success(successMessage);
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _isRetrying?: boolean;
    };

    if (error.response?.status === STATUS.BAD_REQUEST) {
      (error.response.data as { error?: { message: string }[] })?.error?.map(
        (item: { message: string }) => toast.error(item.message)
      );
    }

    if (error.response?.status === STATUS.UNAUTHORIZED) {
      if (originalRequest._isRetrying) {
        localStorage.removeItem(LOCAL_STORAGE.TOKEN);
        window.location.href = PAGE_ROUTES.LOGIN;
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // Đánh dấu request này là retry
          const { data } = await instance.get<refreshTokenResponse>(
            AUTH.REFRESH_TOKEN,
            { _isRetrying: true } as any
          );

          localStorage.setItem(LOCAL_STORAGE.TOKEN, data.accessToken);
          subscribers.forEach((cb) => cb(data.accessToken));
          subscribers = [];

          return instance(originalRequest);
        } catch {
          localStorage.removeItem(LOCAL_STORAGE.TOKEN);
          window.location.href = PAGE_ROUTES.LOGIN;
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        subscribers.push((newToken: string) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(instance(originalRequest));
        });
      });
    }
    if (
      error.response?.status !== STATUS.BAD_REQUEST &&
      error.response?.status !== STATUS.UNAUTHORIZED
    ) {
      toast.error((error.response?.data as { error?: string })?.error);
    }

    return Promise.reject(error);
  }
);

export default instance;
