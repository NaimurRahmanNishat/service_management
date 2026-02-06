// src/modules/booking/booking.interface.ts

export interface CreateBookingPayload {
  serviceId: string;
  bookingType: "daily" | "monthly" | "yearly";  
  duration: number;      
  startDate: string;      
  quantity: number;
  notes?: string;        
}