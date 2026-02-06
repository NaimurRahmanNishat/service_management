// src/modules/stats/stats.service.ts
import { AuthUser } from "../../middleware/auth.middleware";
import Booking from "../booking/booking.model";
import Payment from "../payment/payment.model";
import Product from "../product/product.model";
import Service from "../service/service.model";



/* ================= GET SUPER ADMIN STATS SERVICE ================= */
export const superAdminStatsService = async (user: AuthUser) => {
  try {
    /* ================= PARALLEL AGGREGATIONS ================= */
    const [
        revenueAgg,
        productStatsAgg,
        serviceUserStatsAgg,
        categoryRevenue,
        monthlyStats,
      ] = await Promise.all([

      /* ===== TOTAL REVENUE & COMMISSIONS (SINGLE SCAN) ===== */
      Payment.aggregate([
        { $match: { status: "success" } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" },
            adminProfit: { $sum: "$commission.admin" },
            vendorCommission: { $sum: "$commission.vendor" },
            websiteCommission: { $sum: "$commission.website" },
          },
        },
        {
          $project: {
            _id: 0,
            totalRevenue: 1,
            adminProfit: 1,
            vendorCommission: 1,
            websiteCommission: 1,
          },
        },
      ]),

      /* ===== PRODUCT STATS ===== */
      Product.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id: "$vendor",
            productCount: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            totalVendors: { $sum: 1 },
            totalProducts: { $sum: "$productCount" },
            vendors: {
              $push: {
                vendor: "$_id",
                products: "$productCount",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalVendors: 1,
            totalProducts: 1,
            vendors: 1,
          },
        },
      ]),

      /* ===== SERVICE USER STATS ===== */
      Booking.aggregate([
        {
          $match: {
            status: { $in: ["pending", "completed", "cancelled", "refunded"] },
          },
        },
        {
          $group: {
            _id: "$user",
            totalServicesTaken: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            totalUsers: { $sum: 1 },
            users: {
              $push: {
                user: "$_id",
                servicesTaken: "$totalServicesTaken",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalUsers: 1,
            users: 1,
          },
        },
      ]),

      /* ===== CATEGORY REVENUE ===== */
      Payment.aggregate([
        { $match: { status: "success" } },

        {
          $lookup: {
            from: "bookings",
            localField: "booking",
            foreignField: "_id",
            as: "booking",
          },
        },
        { $unwind: "$booking" },

        {
          $lookup: {
            from: "services",
            localField: "booking.service",
            foreignField: "_id",
            as: "service",
          },
        },
        { $unwind: "$service" },

        {
          $lookup: {
            from: "products",
            localField: "service.product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },

        {
          $group: {
            _id: "$product.category",
            totalRevenue: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            totalRevenue: 1,
          },
        },
      ]),

      /* ===== MONTHLY REVENUE & USERS ===== */
      Payment.aggregate([
        { $match: { status: "success" } },

        {
          $lookup: {
            from: "bookings",
            localField: "booking",
            foreignField: "_id",
            as: "booking",
          },
        },
        { $unwind: "$booking" },

        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            totalRevenue: { $sum: "$amount" },
            users: { $addToSet: "$booking.user" },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            totalRevenue: 1,
            totalUsers: { $size: "$users" },
          },
        },
        { $sort: { year: 1, month: 1 } },
      ]),
    ]);

   /* ================= FORMAT RESPONSE ================= */

    const stats = revenueAgg[0] || {
      totalRevenue: 0,
      adminProfit: 0,
      vendorCommission: 0,
      websiteCommission: 0,
    };

    const productStats = productStatsAgg[0] || {
      totalVendors: 0,
      totalProducts: 0,
      vendors: [],
    };

    const serviceUserStats = serviceUserStatsAgg[0] || {
      totalUsers: 0,
      users: [],
    };

    const data = {
      stats,
      productStats,
      serviceUserStats,
      categoryRevenue,
      monthlyStats,
    };

    return {
      success: true,
      message: "Super admin stats fetched successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch super admin stats",
    };
  }
};


/* ================= GET ADMIN STATS SERVICE ================= */
export const adminStatsService = async (user: AuthUser) => {
  try {
    /* ================= PARALLEL AGGREGATIONS ================= */
    const [
        revenueAgg,
        productStatsAgg,
        serviceUserStatsAgg,
        categoryRevenue,
        monthlyStats,
      ] = await Promise.all([

      /* ===== TOTAL REVENUE & COMMISSIONS (SINGLE SCAN) ===== */
      Payment.aggregate([
        { $match: { status: "success" } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" },
            adminProfit: { $sum: "$commission.admin" },
            vendorCommission: { $sum: "$commission.vendor" },
            websiteCommission: { $sum: "$commission.website" },
          },
        },
        {
          $project: {
            _id: 0,
            totalRevenue: 1,
            adminProfit: 1,
            vendorCommission: 1,
            websiteCommission: 1,
          },
        },
      ]),

      /* ===== PRODUCT STATS ===== */
      Product.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id: "$vendor",
            productCount: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            totalVendors: { $sum: 1 },
            totalProducts: { $sum: "$productCount" },
            vendors: {
              $push: {
                vendor: "$_id",
                products: "$productCount",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalVendors: 1,
            totalProducts: 1,
            vendors: 1,
          },
        },
      ]),

      /* ===== SERVICE USER STATS ===== */
      Booking.aggregate([
        {
          $match: {
            status: { $in: ["pending", "completed", "cancelled", "refunded"] },
          },
        },
        {
          $group: {
            _id: "$user",
            totalServicesTaken: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            totalUsers: { $sum: 1 },
            users: {
              $push: {
                user: "$_id",
                servicesTaken: "$totalServicesTaken",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalUsers: 1,
            users: 1,
          },
        },
      ]),

      /* ===== CATEGORY REVENUE ===== */
      Payment.aggregate([
        { $match: { status: "success" } },

        {
          $lookup: {
            from: "bookings",
            localField: "booking",
            foreignField: "_id",
            as: "booking",
          },
        },
        { $unwind: "$booking" },

        {
          $lookup: {
            from: "services",
            localField: "booking.service",
            foreignField: "_id",
            as: "service",
          },
        },
        { $unwind: "$service" },

        {
          $lookup: {
            from: "products",
            localField: "service.product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },

        {
          $group: {
            _id: "$product.category",
            totalRevenue: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            totalRevenue: 1,
          },
        },
      ]),

      /* ===== MONTHLY REVENUE & USERS ===== */
      Payment.aggregate([
        { $match: { status: "success" } },

        {
          $lookup: {
            from: "bookings",
            localField: "booking",
            foreignField: "_id",
            as: "booking",
          },
        },
        { $unwind: "$booking" },

        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            totalRevenue: { $sum: "$amount" },
            users: { $addToSet: "$booking.user" },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            totalRevenue: 1,
            totalUsers: { $size: "$users" },
          },
        },
        { $sort: { year: 1, month: 1 } },
      ]),
    ]);

    /* ================= FORMAT RESPONSE ================= */

    const stats = revenueAgg[0] || {
      totalRevenue: 0,
      adminProfit: 0,
      vendorCommission: 0,
      websiteCommission: 0,
    };

    const productStats = productStatsAgg[0] || {
      totalVendors: 0,
      totalProducts: 0,
      vendors: [],
    };

    const serviceUserStats = serviceUserStatsAgg[0] || {
      totalUsers: 0,
      users: [],
    };

    const data = {
      stats,
      productStats,
      serviceUserStats,
      categoryRevenue,
      monthlyStats,
    };

    return {
      success: true,
      message: "Super admin stats fetched successfully",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch super admin stats",
    };
  }
};


/* ================= GET VENDOR STATS SERVICE ================= */
export const vendorStatsService = async (user: AuthUser) => {
  try {
    const vendorId = user._id; // Current vendor's ID

    /* ================= PARALLEL AGGREGATIONS ================= */
    const [
      revenueStats,
      serviceUserStats,
      productStats,
      categoryServiceStats,
      monthlyRevenueStats,
      serviceList,
      productList,
    ] = await Promise.all([
      
      /* ===== VENDOR REVENUE & COMMISSION (VENDOR-SPECIFIC) ===== */
      Payment.aggregate([
        { $match: { status: "success" } },
        {
          $lookup: {
            from: "bookings",
            localField: "booking",
            foreignField: "_id",
            as: "booking",
          },
        },
        { $unwind: "$booking" },
        {
          $lookup: {
            from: "services",
            localField: "booking.service",
            foreignField: "_id",
            as: "service",
          },
        },
        { $unwind: "$service" },
        {
          $lookup: {
            from: "products",
            localField: "service.product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        // Filter by vendor
        { $match: { "product.vendor": vendorId } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" },
            adminProfit: { $sum: "$commission.admin" },
            vendorCommission: { $sum: "$commission.vendor" },
            websiteCommission: { $sum: "$commission.website" },
          },
        },
        {
          $project: {
            _id: 0,
            totalRevenue: 1,
            adminProfit: 1,
            vendorCommission: 1,
            websiteCommission: 1,
          },
        },
      ]),

      /* ===== TOTAL SERVICE USERS FOR THIS VENDOR ===== */
      Booking.aggregate([
        {
          $match: {
            status: { $in: ["pending", "completed", "cancelled", "refunded"] },
          },
        },
        {
          $lookup: {
            from: "services",
            localField: "service",
            foreignField: "_id",
            as: "service",
          },
        },
        { $unwind: "$service" },
        {
          $lookup: {
            from: "products",
            localField: "service.product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        // Filter by vendor
        { $match: { "product.vendor": vendorId } },
        {
          $group: {
            _id: "$user",
          },
        },
        {
          $group: {
            _id: null,
            totalServiceUsers: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            totalServiceUsers: 1,
          },
        },
      ]),

      /* ===== TOTAL PRODUCTS & SERVICES FOR THIS VENDOR ===== */
      Product.aggregate([
        { $match: { vendor: vendorId, isActive: true } },
        {
          $lookup: {
            from: "services",
            localField: "_id",
            foreignField: "product",
            as: "services",
          },
        },
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            totalServices: { $sum: { $size: "$services" } },
          },
        },
        {
          $project: {
            _id: 0,
            totalProducts: 1,
            totalServices: 1,
          },
        },
      ]),

      /* ===== CATEGORY-WISE SERVICE COUNT (FOR DOUGHNUT CHART) ===== */
      Product.aggregate([
        { $match: { vendor: vendorId, isActive: true } },
        {
          $lookup: {
            from: "services",
            localField: "_id",
            foreignField: "product",
            as: "services",
          },
        },
        {
          $group: {
            _id: "$category",
            serviceCount: { $sum: { $size: "$services" } },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            serviceCount: 1,
          },
        },
        { $sort: { serviceCount: -1 } },
      ]),

      /* ===== MONTHLY REVENUE TREND (FOR LINE CHART) ===== */
      Payment.aggregate([
        { $match: { status: "success" } },
        {
          $lookup: {
            from: "bookings",
            localField: "booking",
            foreignField: "_id",
            as: "booking",
          },
        },
        { $unwind: "$booking" },
        {
          $lookup: {
            from: "services",
            localField: "booking.service",
            foreignField: "_id",
            as: "service",
          },
        },
        { $unwind: "$service" },
        {
          $lookup: {
            from: "products",
            localField: "service.product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        // Filter by vendor
        { $match: { "product.vendor": vendorId } },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            totalRevenue: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            totalRevenue: 1,
          },
        },
        { $sort: { year: 1, month: 1 } },
      ]),

      /* ===== AVAILABLE SERVICE LIST (LATEST 10) ===== */
      Service.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        { $match: { "product.vendor": vendorId, isActive: true } },
        {
          $project: {
            _id: 1,
            name: 1,
            price: 1,
            duration: 1,
            isActive: 1,
            productName: "$product.name",
            category: "$product.category",
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 10 },
      ]),

      /* ===== AVAILABLE PRODUCT LIST (LATEST 10) ===== */
      Product.aggregate([
        { $match: { vendor: vendorId, isActive: true } },
        {
          $lookup: {
            from: "services",
            localField: "_id",
            foreignField: "product",
            as: "services",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            category: 1,
            isActive: 1,
            serviceCount: { $size: "$services" },
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 10 },
      ]),
    ]);

    /* ================= FORMAT RESPONSE ================= */

    const revenue = revenueStats[0] || {
      totalRevenue: 0,
      adminProfit: 0,
      vendorCommission: 0,
      websiteCommission: 0,
    };

    const serviceUsers = serviceUserStats[0] || {
      totalServiceUsers: 0,
    };

    const products = productStats[0] || {
      totalProducts: 0,
      totalServices: 0,
    };

    const data = {
      stats: {
        totalRevenue: revenue.totalRevenue,
        vendorCommission: revenue.vendorCommission,
        totalServiceUsers: serviceUsers.totalServiceUsers,
        totalServices: products.totalServices,
        totalProducts: products.totalProducts,
      },
      categoryServiceStats,
      monthlyRevenueStats,
      serviceList,
      productList,
    };

    return {
      success: true,
      message: "Vendor stats fetched successfully",
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to fetch vendor stats",
    };
  }
};


/* ================= GET USER STATS SERVICE ================= */
export const userStatsService = async(user: AuthUser) => {
  return {
    success: true,
    message: "User stats fetched successfully",
    data: {},
  }
};
