// src/modules/booking/booking.service.ts

import Product from "../product/product.model";
import Service from "../service/service.model";
import { CreateBookingPayload } from "./booking.interface";
import Booking from "./booking.model";



// ========================== 1. create booking =============================
export const createBooking = async (payload: CreateBookingPayload, userId: string) => {
  const { serviceId, bookingType, duration, startDate, quantity, notes } = payload;

  try {
    // ============== VALIDATION ==============
    if (!serviceId || !bookingType || !duration || !startDate || !quantity) {
      return {
        success: false,
        message: "Missing required fields: serviceId, bookingType, duration, startDate, quantity",
        data: null,
      };
    }

    // Validate quantity
    if (quantity < 1) {
      return {
        success: false,
        message: "Quantity must be at least 1",
        data: null,
      };
    }

    // ============== GET SERVICE DETAILS ==============
    const service = await Service.findById(serviceId)
      .populate("product")
      .populate("vendor");

    if (!service) {
      return {
        success: false,
        message: "Service not found",
        data: null,
      };
    }

    // Check if service is available
    if (service.isAvailable !== "available") {
      return {
        success: false,
        message: "Service is currently not available for booking",
        data: null,
      };
    }

    // ============== GET PRODUCT DETAILS ==============
    const product = await Product.findById(service.product);

    if (!product) {
      return {
        success: false,
        message: "Product not found",
        data: null,
      };
    }

    // Check stock availability
    if (product.quantity < quantity) {
      return {
        success: false,
        message: `Only ${product.quantity} item(s) available in stock`,
        data: null,
      };
    }

    // ============== VALIDATE BOOKING TYPE & GET PRICE ==============
    let unitPrice = 0;

    if (bookingType === "daily" && service.rentOptions.daily && service.price.daily) {
      unitPrice = service.price.daily;
    } else if (bookingType === "monthly" && service.rentOptions.monthly && service.price.monthly) {
      unitPrice = service.price.monthly;
    } else if (bookingType === "yearly" && service.rentOptions.yearly && service.price.yearly) {
      unitPrice = service.price.yearly;
    } else {
      return {
        success: false,
        message: `${bookingType} rental option is not available for this service`,
        data: null,
      };
    }

    // ============== CALCULATE DATES ==============
    const start = new Date(startDate);
    const end = new Date(startDate);

    // Validate start date
    if (isNaN(start.getTime())) {
      return {
        success: false,
        message: "Invalid start date format",
        data: null,
      };
    }

    // Calculate end date based on booking type
    if (bookingType === "daily") {
      end.setDate(end.getDate() + duration);
    } else if (bookingType === "monthly") {
      end.setMonth(end.getMonth() + duration);
    } else if (bookingType === "yearly") {
      end.setFullYear(end.getFullYear() + duration);
    }

    // ============== CALCULATE TOTAL PRICE ==============
    const totalPrice = unitPrice * duration * quantity;

    // ============== CREATE BOOKING ==============
    const booking = await Booking.create({
      service: serviceId,
      product: product._id,
      vendor: service.vendor,
      user: userId,
      bookingType,
      duration,
      startDate: start,
      endDate: end,
      quantity,
      pricing: {
        unitPrice,
        totalPrice,
        vendorCommissionRate: product.vendorCommissionRate,
      },
      status: "pending",
      notes: notes || "",
    });

    // ============== POPULATE BOOKING DATA ==============
    const populatedBooking = await Booking.findById(booking._id)
      .populate({
        path: "service",
        populate: {
          path: "product location",
        },
      })
      .populate("product")
      .populate("vendor")
      .populate("user", "name email phone");

    return {
      success: true,
      message: "Booking created successfully. Please complete payment to confirm.",
      data: populatedBooking,
    };
  } catch (error: any) {
    console.error("Create Booking Error:", error);
    return {
      success: false,
      message: error.message || "Failed to create booking",
      data: null,
    };
  }
};

















// // ========================== 2. get all bookings =============================
// export const getAllBookings = async ( filters: BookingFilters = {}, options: ICursorPaginationOptions = {} ) => {
//   try {
//     const { limit, sortBy, sortOrder, filter } =
//       calculateCursorPagination(options);

//     // Merge filters
//     const bookingFilter: any = { ...filter };
//     if (filters.status) bookingFilter.status = filters.status;
//     if (filters.serviceId) bookingFilter.service = filters.serviceId;
//     if (filters.userId) bookingFilter.user = filters.userId;

//     const bookings = await Booking.find(bookingFilter)
//       .populate("service", "name category price images location")
//       .populate("user", "name email phone")
//       .populate("payment")
//       .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
//       .limit(limit + 1)
//       .lean();

//     const result = createCursorPaginationMeta(
//       bookings,
//       limit,
//       sortBy,
//       sortOrder
//     );

//     return {
//       success: true,
//       message: "Bookings fetched successfully",
//       data: result.data,
//       meta: result.meta,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: "Failed to fetch bookings",
//       errors: [error.message || "Failed to fetch bookings"],
//     };
//   }
// };


// // ========================== 3. get user bookings =============================
// export const getUserBookings = async ( userId: string, filters: BookingFilters = {}, options: ICursorPaginationOptions = {} ) => {
//   try {
//     const { limit, sortBy, sortOrder } = calculateCursorPagination(options);

//     const bookingFilter: any = { user: userId };
//     if (filters.status) bookingFilter.status = filters.status;

//     const bookings = await Booking.find(bookingFilter)
//       .populate("service", "name category price images location vendor")
//       .populate("payment", "paymentStatus paymentMethod amount")
//       .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
//       .limit(limit + 1)
//       .lean();

//     const result = createCursorPaginationMeta(
//       bookings,
//       limit,
//       sortBy,
//       sortOrder
//     );

//     return {
//       success: true,
//       message: "User bookings fetched successfully",
//       data: result.data,
//       meta: result.meta,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: "Failed to fetch user bookings",
//       errors: [error.message || "Failed to fetch user bookings"],
//     };
//   }
// };


// // ========================== 4. get vendor bookings =============================
// export const getVendorBookings = async ( vendorId: string, filters: BookingFilters = {}, options: ICursorPaginationOptions = {} ) => {
//   try {
//     const { limit, sortBy, sortOrder } = calculateCursorPagination(options);

//     // Find all services by vendor
//     const services = await Service.find({ vendor: vendorId }).select("_id");
//     const serviceIds = services.map((s) => s._id);

//     const bookingFilter: any = { service: { $in: serviceIds } };
//     if (filters.status) bookingFilter.status = filters.status;

//     const bookings = await Booking.find(bookingFilter)
//       .populate("service", "name category price images")
//       .populate("user", "name email phone")
//       .populate("payment", "paymentStatus paymentMethod amount")
//       .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
//       .limit(limit + 1)
//       .lean();

//     const result = createCursorPaginationMeta(
//       bookings,
//       limit,
//       sortBy,
//       sortOrder
//     );

//     return {
//       success: true,
//       message: "Vendor bookings fetched successfully",
//       data: result.data,
//       meta: result.meta,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: "Failed to fetch vendor bookings",
//       errors: [error.message || "Failed to fetch vendor bookings"],
//     };
//   }
// };


// // ========================== 5. get booking by id =============================
// export const getBookingById = async (id: string) => {
//   try {
//     const booking = await Booking.findById(id)
//       .populate("service", "name description category price images location vendor")
//       .populate("user", "name email phone")
//       .populate("payment")
//       .lean();

//     if (!booking) {
//       return {
//         success: false,
//         message: "Booking not found",
//         errors: ["Booking not found"],
//       };
//     }

//     return {
//       success: true,
//       message: "Booking fetched successfully",
//       data: booking,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: "Failed to fetch booking",
//       errors: [error.message || "Failed to fetch booking"],
//     };
//   }
// };


// // ========================== 6. confirm booking =============================
// export const confirmBooking = async (id: string) => {
//   try {
//     const booking = await Booking.findById(id);

//     if (!booking) {
//       return {
//         success: false,
//         message: "Booking not found",
//         errors: ["Booking not found"],
//       };
//     }

//     if (booking.status !== "pending") {
//       return {
//         success: false,
//         message: "Only pending bookings can be confirmed",
//         errors: ["Invalid status transition"],
//       };
//     }

//     booking.status = "confirmed";
//     await booking.save();

//     const populatedBooking = await Booking.findById(booking._id)
//       .populate("service", "name category price")
//       .populate("user", "name email");

//     return {
//       success: true,
//       message: "Booking confirmed successfully",
//       data: populatedBooking,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: "Failed to confirm booking",
//       errors: [error.message || "Failed to confirm booking"],
//     };
//   }
// };


// // ========================== 7. cancel booking =============================
// export const cancelBooking = async (id: string, reason?: string) => {
//   try {
//     const booking = await Booking.findById(id).populate("service");

//     if (!booking) {
//       return {
//         success: false,
//         message: "Booking not found",
//         errors: ["Booking not found"],
//       };
//     }

//     if (!["pending", "confirmed"].includes(booking.status)) {
//       return {
//         success: false,
//         message: "Only pending or confirmed bookings can be cancelled",
//         errors: ["Invalid status for cancellation"],
//       };
//     }

//     booking.status = "cancelled";
//     booking.cancellationReason = reason;
//     booking.cancelledAt = new Date();

//     await booking.save();

//     // Increase service quantity back
//     await serviceService.increaseAvailableQuantity(
//       booking.service._id.toString(),
//       booking.quantity
//     );

//     return {
//       success: true,
//       message: "Booking cancelled successfully",
//       data: booking,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: "Failed to cancel booking",
//       errors: [error.message || "Failed to cancel booking"],
//     };
//   }
// };

// // ========================== 8. complete booking =============================
// export const completeBooking = async (id: string) => {
//   try {
//     const booking = await Booking.findById(id);

//     if (!booking) {
//       return {
//         success: false,
//         message: "Booking not found",
//         errors: ["Booking not found"],
//       };
//     }

//     if (booking.status !== "active") {
//       return {
//         success: false,
//         message: "Only active bookings can be completed",
//         errors: ["Invalid status transition"],
//       };
//     }

//     booking.status = "completed";
//     await booking.save();

//     const populatedBooking = await Booking.findById(booking._id)
//       .populate("service", "name category")
//       .populate("user", "name email");

//     return {
//       success: true,
//       message: "Booking completed successfully",
//       data: populatedBooking,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: "Failed to complete booking",
//       errors: [error.message || "Failed to complete booking"],
//     };
//   }
// };


// // ========================== 9. update booking status =============================
// export const updateBookingStatus = async (id: string, status: BookingStatus) => {
//   try {
//     const booking = await Booking.findById(id);

//     if (!booking) {
//       return {
//         success: false,
//         message: "Booking not found",
//         errors: ["Booking not found"],
//       };
//     }

//     booking.status = status;
//     await booking.save();

//     const populatedBooking = await Booking.findById(booking._id)
//       .populate("service", "name category")
//       .populate("user", "name email");

//     return {
//       success: true,
//       message: "Booking status updated successfully",
//       data: populatedBooking,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: "Failed to update booking status",
//       errors: [error.message || "Failed to update booking status"],
//     };
//   }
// };
