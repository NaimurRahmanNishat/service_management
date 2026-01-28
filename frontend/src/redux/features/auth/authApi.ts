/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/features/auth/authApi.ts

import { baseApi } from "@/redux/api/baseApi";
import type { ILoginResponse, ILoginUserInput, ILogoutResponse } from "@/types/authType";
import type { IActivateResponse, IActivateUserInput, IRegisterResponse, IRegisterUserInput, IResendActivationInput, IResendActivationResponse } from "@/types/userType";


// Step 3: Create RTK Query API
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // 1. Register User 
    registerUser: builder.mutation<IRegisterResponse, IRegisterUserInput>({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Auth"],
    }),

    // 2. Activate User 
    activateUser: builder.mutation<IActivateResponse, IActivateUserInput>({
      query: (data) => ({
        url: "/auth/activate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
      transformErrorResponse: (response: any) => {
        return {
          status: response.status,
          message: response.data?.message || "Activation failed",
          errors: response.data?.errors || [],
        };
      },
    }),

    // 3. Resend Activation Code 
    resendActivation: builder.mutation<IResendActivationResponse, IResendActivationInput>({
      query: (data) => ({
        url: "/auth/resend-activation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // 3. Login User 
    loginUser: builder.mutation<ILoginResponse, ILoginUserInput>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // 4. social login
    socialLogin: builder.mutation({
      query: (body) => ({
        url: "/auth/social-login",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),

    // 5. Logout User 
    userLogout: builder.mutation<ILogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch({ type: "auth/logout" });
        } catch (error) {
          console.error("Logout failed:", error);
          dispatch({ type: "auth/logout" });
        }
      },
    }),
    
  }),
});

// Export Hooks 
export const { useRegisterUserMutation, useActivateUserMutation, useResendActivationMutation,  useLoginUserMutation, useSocialLoginMutation, useUserLogoutMutation } = authApi;

