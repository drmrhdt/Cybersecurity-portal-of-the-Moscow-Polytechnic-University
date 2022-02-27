import { User } from '../../models/User';

export interface RefreshTokensResponse {
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
}
