// src/modules/payment/payment.controller.ts

import { Request, Response } from "express";
import config from "../../config";
import { AuthRequest } from "../../middleware/auth.middleware";
import Payment from "./payment.model";
import User from "../users/user.model";
import Vendor from "../vendor/vendor.model";
import Booking from "../booking/booking.model";
import Product from "../product/product.model";
import Service from "../service/service.model";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// ========================= Commission Configuration =========================
const WEBSITE_COMMISSION_RATE = 0.10; // Fixed 10%



// ========================= 1. make stripe payment =============================
export const makeStripePayment = async (req: AuthRequest, res: Response) => {
  const { bookingId } = req.body;

  if (!bookingId) {
    return res.status(400).json({ error: "Booking ID is required" });
  }

  try {
    const booking = await Booking.findById(bookingId)
      .populate("product")
      .populate("service")
      .lean();

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ error: "Booking is not in pending status" });
    }

    // Create Stripe line item
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${(booking.product as any).name} - ${booking.bookingType} rental`,
            description: `Duration: ${booking.duration} ${booking.bookingType}(s), Quantity: ${booking.quantity}`,
          },
          unit_amount: Math.round(booking.pricing.totalPrice * 100),
        },
        quantity: 1,
      },
    ];

    // Convert ObjectIds to strings properly
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,

      success_url: `${config.client_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.client_url}/payment/cancel`,

      metadata: {
        bookingId: booking._id.toString(),          
        vendorId: booking.vendor.toString(),        
        userId: booking.user.toString(),            
        productId: booking.product._id?.toString() || booking.product.toString(),
        quantity: booking.quantity.toString(),      
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};



// ========================= 2. confirm stripe payment =============================
export const confirmStripePayment = async (req: Request, res: Response) => {
  const { session_id } = req.body;

  if (!session_id) {
    return res.status(400).json({
      success: false,
      message: "session_id is required",
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    });

    if (session.payment_status !== "paid") {
      return res.status(402).json({
        success: false,
        message: "Payment not completed",
      });
    }

    const paymentIntent: any = session.payment_intent;
    const totalAmount = session.amount_total ? session.amount_total / 100 : 0;

    // ============== GET BOOKING DETAILS ==============
    const booking = await Booking.findById(session.metadata?.bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // ============== CALCULATE COMMISSION ==============
    const vendorCommissionRate = booking.pricing.vendorCommissionRate / 100;
    
    const websiteCommission = totalAmount * WEBSITE_COMMISSION_RATE;
    const vendorCommission = totalAmount * vendorCommissionRate;
    const adminCommission = totalAmount - websiteCommission - vendorCommission;

    const paymentData = {
      booking: session.metadata?.bookingId,
      user: session.metadata?.userId,
      vendor: session.metadata?.vendorId,
      amount: totalAmount,
      method: "stripe" as const,
      status: "success" as const,
      commission: {
        website: Number(websiteCommission.toFixed(2)),
        vendor: Number(vendorCommission.toFixed(2)),
        admin: Number(adminCommission.toFixed(2)),
      },
      transactionId: paymentIntent.id,
      gatewayResponse: {
        sessionId: session.id,
        paymentIntentId: paymentIntent.id,
        amountTotal: totalAmount,
        currency: session.currency,
        paymentMethod: paymentIntent.payment_method_types,
        status: paymentIntent.status,
      },
    };

    // Save payment record
    const payment = await Payment.create(paymentData);

    // ============== UPDATE BOOKING STATUS ==============
    booking.status = "completed";
    booking.payment = payment._id as any;
    await booking.save();

    // ============== REDUCE PRODUCT QUANTITY (AUTOMATIC) ==============
    const quantity = parseInt(session.metadata?.quantity || "1");
    await Product.findByIdAndUpdate(session.metadata?.productId, {
      $inc: { quantity: -quantity },
    });

    // Check if product is out of stock, update service availability
    const product = await Product.findById(session.metadata?.productId);
    if (product && product.quantity <= 0) {
      await Service.updateMany(
        { product: product._id },
        { isAvailable: "unavailable" }
      );
    }

    // ============== UPDATE VENDOR BALANCE ==============
    if (session.metadata?.vendorId) {
      await Vendor.findByIdAndUpdate(session.metadata.vendorId, {
        $inc: {
          pendingBalance: vendorCommission,
          totalEarnings: vendorCommission,
          totalSales: totalAmount,
          totalOrders: 1,
        },
      });
    }

    // ============== UPDATE ADMIN COMMISSION ==============
    const superAdmin = await User.findOne({
      role: "super_admin",
      isActive: true,
    });

    if (superAdmin) {
      await User.findByIdAndUpdate(superAdmin._id, {
        $inc: {
          pendingCommission: adminCommission,
          totalCommissionEarned: adminCommission,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment successful! Booking confirmed.",
      data: {
        paymentId: payment._id,
        bookingId: booking._id,
        sessionId: session.id,
        paymentIntentId: paymentIntent.id,
        amountTotal: totalAmount,
        commission: {
          website: Number(websiteCommission.toFixed(2)),
          vendor: Number(vendorCommission.toFixed(2)),
          admin: Number(adminCommission.toFixed(2)),
          vendorRate: booking.pricing.vendorCommissionRate,
        },
        productQuantityReduced: quantity,
        currency: session.currency,
        paymentMethod: paymentIntent.payment_method_types,
        status: paymentIntent.status,
      },
    });
  } catch (error: any) {
    console.error("Stripe Confirm Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

