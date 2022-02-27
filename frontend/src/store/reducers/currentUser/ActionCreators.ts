import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '../../../models/User';
import { AuthService } from '../../../services';
import { RootState } from '../../index';

export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { state: RootState }
>('currentUser/fetchUser', async (_, thunkAPI) => {
  try {
    const { authReducer } = thunkAPI.getState();
    if (authReducer.access_token) {
      const response = await AuthService.getUserInfoByToken(
        authReducer.access_token,
      );
      return response.data;
    } else {
      return thunkAPI.rejectWithValue('Access token not found');
    }
  } catch (e) {
    return thunkAPI.rejectWithValue('Current user info not loaded');
  }
});
