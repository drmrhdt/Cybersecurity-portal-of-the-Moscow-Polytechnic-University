import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../../models/User';
import { fetchCurrentUser } from './ActionCreators';

interface CurrentUserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CurrentUserState = {
  currentUser: null,
  isLoading: true,
  error: null,
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    clearUserState(state) {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.currentUser = action.payload;
    });

    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });
  },
});
