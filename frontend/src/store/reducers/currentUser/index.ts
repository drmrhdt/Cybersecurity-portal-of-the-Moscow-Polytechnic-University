import { currentUserSlice } from './CurrentUserSlice';

const { actions, reducer } = currentUserSlice;

export const { setUser, clearUserState } = actions;

export default reducer;
