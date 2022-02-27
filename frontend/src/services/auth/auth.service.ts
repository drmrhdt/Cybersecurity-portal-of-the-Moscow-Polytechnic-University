import { AxiosResponse } from 'axios';

import { User } from '../../models/User';
import { axiosInstance } from '../AxiosInstance';
import { AUTH_URLS } from './constants';
import {
  LoginResponse,
  LogoutResponse,
  RefreshTokensResponse,
} from './responses.type';

export class AuthService {
  static async refreshTokens(): Promise<AxiosResponse<RefreshTokensResponse>> {
    return axiosInstance.get<RefreshTokensResponse>(AUTH_URLS.REFRESH_TOKENS);
  }

  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<LoginResponse>> {
    return axiosInstance.post<LoginResponse>(AUTH_URLS.LOGIN, {
      email,
      password,
    });
  }

  static async getUserInfoByToken(
    access_token: string,
  ): Promise<AxiosResponse<User>> {
    return axiosInstance.get<User>(AUTH_URLS.USER_INFO_BY_TOKEN, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }

  static async logout(): Promise<AxiosResponse<LogoutResponse>> {
    return axiosInstance.get<LogoutResponse>(AUTH_URLS.LOGOUT);
  }
}
