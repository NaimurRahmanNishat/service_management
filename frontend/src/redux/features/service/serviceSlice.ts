// src/redux/features/service/serviceSlice.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BookingDetails {
  bookingId: string;   
  serviceId: string;
  vendorId: string;      
  productId: string;    
  bookingType: "daily" | "monthly" | "yearly";
  startDate: string;
  endDate: string;
  duration: number;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
}

interface ServiceState {
  selectedService: any;
  selectedBookingType: "daily" | "monthly" | "yearly" | null;
  bookingDetails: BookingDetails | null;
}

const initialState: ServiceState = {
  selectedService: null,
  selectedBookingType: null,
  bookingDetails: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
    },
    setBookingType: (state, action: PayloadAction<"daily" | "monthly" | "yearly">) => {
      state.selectedBookingType = action.payload;
    },
    setBookingDetails: (state, action: PayloadAction<BookingDetails>) => {
      state.bookingDetails = action.payload;
    },
    clearBookingDetails: (state) => {
      state.bookingDetails = null;
      state.selectedBookingType = null;
    },
  },
});

export const { setSelectedService, setBookingType, setBookingDetails, clearBookingDetails } = serviceSlice.actions;
export default serviceSlice.reducer;
