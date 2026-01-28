// src/pages/payment/PaymentSuccess.tsx
import { getBaseUrl } from "@/utils/getBaseUrl ";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface ServiceItem {
  name: string;
  quantity: number;
  unitAmount: number;
}

interface SessionData {
  sessionId: string;
  paymentIntentId: string;
  amountTotal: number;
  currency: string;
  paymentMethod: string[];
  status: string;
  customerEmail?: string;
  services?: ServiceItem[];
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const PaymentSuccess = () => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const confirmPayment = async () => {
      const query = new URLSearchParams(window.location.search);
      const sessionId = query.get("session_id");

      if (!sessionId) return;

      try {
        const response = await axios.post(
          `${getBaseUrl()}/api/v1/payment/confirm-stripe-payment`,
          { session_id: sessionId },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setSessionData(response.data.data);
      } catch (error) {
        console.error("Payment confirmation failed:", error);
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-medium text-gray-600"
        >
          Verifying payment...
        </motion.p>
      </div>
    );
  }

  if (!sessionData) {
    return (
      <div className="min-h-screen grid place-items-center">
        <p className="text-lg text-red-500">Payment data not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-4xl"
          >
            ✅
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
            Payment Successful
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Thank you! Your payment has been processed successfully.
          </p>
        </div>

        {/* Payment Info */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-5 space-y-3 text-sm sm:text-base">
          <InfoRow label="Order ID" value={sessionData.sessionId} />
          <InfoRow
            label="Payment Intent"
            value={sessionData.paymentIntentId}
          />
          <InfoRow
            label="Amount Paid"
            value={`$${sessionData.amountTotal} ${sessionData.currency.toUpperCase()}`}
          />
          <InfoRow
            label="Payment Method"
            value={sessionData.paymentMethod.join(", ")}
          />
          <InfoRow
            label="Status"
            value={sessionData.status}
            highlight
          />
          {sessionData.customerEmail && (
            <InfoRow
              label="Customer Email"
              value={sessionData.customerEmail}
            />
          )}
        </div>

        {/* Services */}
        {sessionData.services && sessionData.services.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Purchased Services</h3>
            <ul className="space-y-2">
              {sessionData.services.map((service, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between text-sm sm:text-base bg-gray-50 rounded-lg px-3 py-2"
                >
                  <span>
                    {service.name} × {service.quantity}
                  </span>
                  <span className="font-medium">
                    ${service.unitAmount}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-xs sm:text-sm text-gray-500">
            You will receive a confirmation email shortly.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;

/* Reusable Row */
const InfoRow = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean; }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
    <span className="font-medium text-gray-600">{label}</span>
    <span
      className={`break-all ${
        highlight ? "text-green-600 font-semibold" : "text-gray-800"
      }`}
    >
      {value}
    </span>
  </div>
);
