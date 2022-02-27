import { AuthSlice } from './AuthSlice';

const { actions, reducer } = AuthSlice;

export const { setAccessToken, clearAuthState } = actions;

export default reducer;
