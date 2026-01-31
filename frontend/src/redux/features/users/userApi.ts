// src/redux/features/users/userApi.ts
import { baseApi } from "@/redux/api/baseApi";
import type { GetAllUsersParams, IAllUserResponse, IDeleteUserResponse, IGetMeResponse, IUpdateProfileResponse } from "@/types/userType";


// Step 3: Create RTK Query API
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get Me
    getMe: builder.query<IGetMeResponse , void>( {
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),

    // 2. Update Profile
    updateProfile: builder.mutation<IUpdateProfileResponse, FormData>({
      query: (formData) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    // 3. get all user
    getAllUsers: builder.query<IAllUserResponse, GetAllUsersParams>({
      query: (params) => {
        const q = new URLSearchParams();
        if (params?.limit) q.append("limit", params.limit.toString());
        if (params?.cursor) q.append("cursor", params.cursor);
        if (params?.sortBy) q.append("sortBy", params.sortBy);
        if (params?.sortOrder) q.append("sortOrder", params.sortOrder);
        if (params?.search) q.append("search", params.search);
        if (params?.role) q.append("role", params.role);
        return {
          url: `/user/all-users?${q.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),

    // 4. delete user
    deleteUser: builder.mutation<IDeleteUserResponse, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),

  }),
});

// Export Hooks 
export const { useGetMeQuery, useUpdateProfileMutation, useGetAllUsersQuery, useDeleteUserMutation } = userApi;
