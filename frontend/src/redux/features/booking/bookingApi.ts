// src/redux/features/rent/rentApi.ts

import { baseApi } from "@/redux/api/baseApi";


// Step 3: Create RTK Query API
export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking/create-booking",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Booking"],
    }),
    }),
});


export const { useCreateBookingMutation } = bookingApi;