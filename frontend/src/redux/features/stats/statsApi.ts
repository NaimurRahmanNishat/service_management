// src/redux/features/stats/statsApi.ts
import { baseApi } from "@/redux/api/baseApi";
import type { IStatsResponse } from "@/types/statsType";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /* =============== Super Admin Stats =============== */
    getSuperAdminStats: builder.query<IStatsResponse, void>({
      query: () => ({
        url: "/stats/super-admin",
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: IStatsResponse;
      }) => response.data,
      providesTags: ["Stats"],
    }),

    /* =============== Admin Stats =============== */
    getAdminStats: builder.query<IStatsResponse, void>({
      query: () => ({
        url: "/stats/admin",
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: IStatsResponse;
      }) => response.data,
      providesTags: ["Stats"],
    }),

    /* =============== Vendor Stats =============== */
    getVendorStats: builder.query<IStatsResponse, void>({
      query: () => ({
        url: "/stats/vendor",
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: IStatsResponse;
      }) => response.data,
      providesTags: ["Stats"],
    }),

    /* =============== User Stats =============== */
    getUserStats: builder.query<IStatsResponse, void>({
      query: () => ({
        url: "/stats/user",
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: IStatsResponse;
      }) => response.data,
      providesTags: ["Stats"],
    }),
  }),
});


export const { useGetSuperAdminStatsQuery, useGetAdminStatsQuery, useGetVendorStatsQuery, useGetUserStatsQuery } = statsApi;

