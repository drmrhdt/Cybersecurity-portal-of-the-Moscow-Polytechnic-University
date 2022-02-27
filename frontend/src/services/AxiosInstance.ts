import axios, { AxiosError } from 'axios';

import { AppStore } from '../store';
import { clearAuthState, setAccessToken } from '../store/reducers/auth';
import { AuthService } from './auth';
import { AUTH_URLS } from './auth/constants';

let store: AppStore;

export const injectStore = (_store: AppStore) => {
  store = _store;
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  undefined,
  async (error: AxiosError) => {
    const { dispatch } = store;
    if (!error.response) {
      return new Promise((_, reject) => {
        reject(error);
      });
    }

    if (error.response.status === 403) {
      if (error.response.config.url === AUTH_URLS.LOGIN) {
        return new Promise((_, reject) => {
          reject(error);
        });
      } else if (error.response.config.url === AUTH_URLS.REFRESH_TOKENS) {
        dispatch(clearAuthState());
        return new Promise((_, reject) => {
          reject(error);
        });
      } else {
        try {
          const res = await AuthService.refreshTokens();
          dispatch(setAccessToken(res.data.access_token));
          error.config.headers!.Authorization = `Bearer ${res.data.access_token}`;
          return axiosInstance.request(error.config);
        } catch (_) {
          return new Promise((_, reject) => {
            reject(error);
          });
        }
      }
    } else {
      return new Promise((_, reject) => {
        reject(error);
      });
    }
  },
);

export { axiosInstance };
