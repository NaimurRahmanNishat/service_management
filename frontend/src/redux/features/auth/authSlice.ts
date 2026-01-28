// src/redux/features/auth/authSlice.ts

import type { IUser } from "@/types/userType";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ================= SET USER =================
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    // ================= SET ACCESS TOKEN =================
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },

    // ================= LOGOUT =================
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
    },

    // ================= LOADING =================
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
