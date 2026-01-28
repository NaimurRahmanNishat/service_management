// src/redux/features/home/homeApi.ts

import { baseApi } from "@/redux/api/baseApi";
import type { IDeleteHomeResponse, IGetAllHomeParams, IGetAllHomeResponse, IHomeResponse, IUpdateHomeResponse } from "@/types/homeType";


// Step 3: Create RTK Query API
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // 1. create home data
    createHome: builder.mutation<IHomeResponse, FormData>({
      query: (formData) => ({
        url: "/home/create-home",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Home"],
    }),

    // 2. get all data
    getAllHomeData:builder.query<IGetAllHomeResponse, IGetAllHomeParams | void>({
      query: (params) => { const queryParams = new URLSearchParams();
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.cursor) queryParams.append("cursor", params.cursor);
        if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
        if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);
        if (params?.search) queryParams.append("search", params.search);
        if (params?.searchFields) queryParams.append("searchFields", params.searchFields.join(","));
        const queryString = queryParams.toString();
        return {
          url: `/home/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Home"],
    }),

    // 3. update home data
    updateHome: builder.mutation<IUpdateHomeResponse, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/home/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Home"],
    }),

    // 4. delete home data
    deleteHome: builder.mutation<IDeleteHomeResponse, { id: string }>({
      query: (id) => ({
        url: `/home/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Home"],
    }),
    
  }),
});

// Export Hooks 
export const { useCreateHomeMutation, useGetAllHomeDataQuery, useUpdateHomeMutation, useDeleteHomeMutation } = authApi;