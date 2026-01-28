// src/redux/features/service/serviceApi.ts

import { baseApi } from "@/redux/api/baseApi";
import type { GetAllServicesParams, GetAllServicesResponse } from "@/types/serviceType";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Create service
    createService: builder.mutation({
      query: (formData) => ({
        url: "/services",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Service"],
    }),

    // 2. Get all services
    getAllServiceData: builder.query<GetAllServicesResponse, GetAllServicesParams>({
  query: (params) => {
      const q = new URLSearchParams();
      if (params?.limit) q.append("limit", params.limit.toString());
      if (params?.cursor) q.append("cursor", params.cursor);
      if (params?.sortBy) q.append("sortBy", params.sortBy);
      if (params?.sortOrder) q.append("sortOrder", params.sortOrder);
      if (params?.search) q.append("search", params.search);
      return { url: `/services?${q.toString()}`, method: "GET" };
    },
      providesTags: ["Service"],
    }),

    // 3. Get single service
    getSingleServiceData: builder.query({
      query: (id) => ({
        url: `/services/${id}`, 
        method: "GET",
      }),
      providesTags: ["Service"],
    }),

    // 4. Update service
    updateService: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Service"],
    }),

    // 5. Delete service
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),

  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServiceDataQuery,
  useGetSingleServiceDataQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;