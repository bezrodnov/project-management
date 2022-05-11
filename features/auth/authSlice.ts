import { PayloadAction, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState, useAppSelector } from '~/store';

const signIn = createAsyncThunk('auth/signIn', (credentials: { login: string; password: string }) =>
  axios.post<void>('/signin', credentials).then(() => {})
);

const signUp = createAsyncThunk('auth/signUp', (user: { name: string; login: string; password: string }) =>
  axios.post<void>('/signup', user).then(() => {})
);

const signOff = createAsyncThunk('auth/signOff', () => axios.post<void>('/signoff').then(() => {}));

export type AuthState = {
  isAuthenticated: boolean;
};

const initialState: AuthState = { isAuthenticated: false };

const reducers = {
  initAuth: (state: AuthState, action: PayloadAction<{ isAuthenticated: boolean }>) => {
    state.isAuthenticated = action.payload.isAuthenticated;
  },
};

export const authSlice = createSlice<AuthState, typeof reducers>({
  name: 'auth',
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state) => {
      state.isAuthenticated = true;
    });

    builder.addCase(signOff.fulfilled, (state) => {
      state.isAuthenticated = false;
    });
  },
});

const authSelector = createSelector(
  ({ auth }: RootState) => auth,
  (auth) => auth
);

const { initAuth } = authSlice.actions;
const { reducer } = authSlice;
const useAuthSelector = () => useAppSelector(authSelector);

export { signIn, signUp, signOff, initAuth, useAuthSelector, reducer as authReducer };
