import { PayloadAction, SliceCaseReducers, createSlice } from '@reduxjs/toolkit';

export type AuthState =
  | {
      isAuthenticated: false;
      userId: undefined;
    }
  | {
      isAuthenticated: true;
      userId: string;
    };

const initialState: AuthState = {
  isAuthenticated: false,
  userId: undefined,
};

const reducers = {
  login: (state: AuthState, action: PayloadAction<{ userId: string }>): AuthState => ({
    ...state,
    isAuthenticated: true,
    userId: action.payload.userId,
  }),
  logoff: (state: AuthState): AuthState => ({ ...state, userId: undefined, isAuthenticated: false }),
};

export const authSlice = createSlice<AuthState, typeof reducers>({
  name: 'auth',
  initialState,
  reducers,
});

export const { login, logoff } = authSlice.actions;

export const { reducer: authReducer } = authSlice;
