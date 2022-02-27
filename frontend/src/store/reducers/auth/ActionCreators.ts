import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '../../../services';
import {
  LoginResponse,
  LogoutResponse,
  RefreshTokensResponse,
} from '../../../services/auth/responses.type';
import { RootState } from '../../index';
import { clearUserState, setUser } from '../currentUser';

export const fetchRefreshTokens = createAsyncThunk<
  RefreshTokensResponse,
  void,
  { state: RootState }
>('auth/fetchRefreshTokens', async (_, thunkAPI) => {
  try {
    const response = await AuthService.refreshTokens();
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Tokens not loaded');
  }
});

export const fetchLogin = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { state: RootState }
>('auth/fetchLogin', async ({ email, password }, thunkAPI) => {
  try {
    const response = await AuthService.login(email, password);
    thunkAPI.dispatch(setUser(response.data.user));
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Tokens not loaded');
  }
});

export const fetchLogout = createAsyncThunk<
  LogoutResponse,
  void,
  { state: RootState }
>('auth/fetchLogout', async (_, thunkAPI) => {
  try {
    const response = await AuthService.logout();
    thunkAPI.dispatch(clearUserState());
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Logout error');
  }
});
