/* eslint-disable @typescript-eslint/no-explicit-any */
// // src/pages/payment/Payment.tsx
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react';
// import { Layers } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import type { RootState } from '@/redux/store';
// import { useNavigate } from 'react-router-dom';
// import { getBaseUrl } from '@/utils/getBaseUrl ';
// import axios from 'axios';
// import { useForm } from "react-hook-form";
// import { paymentSchema, type PaymentFormData } from '@/validations/payment.validation';
// import { zodResolver } from "@hookform/resolvers/zod";


// const Payment = () => {
//   const navigate = useNavigate();
//   const [focusedField, setFocusedField] = useState<string | null>(null);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("stripe");

//   /* ================= React Hook Form ================= */
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<PaymentFormData>({ resolver: zodResolver(paymentSchema) });

//   const bookingDetails = useSelector(
//     (state: RootState) => state.service.bookingDetails
//   );

//   if (!bookingDetails) {
//     navigate("/services"); 
//     return null;
//   }

//   const { totalPrice, bookingType, duration, unitPrice } = bookingDetails;

//   const onSubmit = async (data: PaymentFormData) => {
//     console.log("Form data:", data);

//     if (selectedPaymentMethod === "stripe") {
//       try {
//         const res = await axios.post(
//           `${getBaseUrl()}/api/v1/payment/create-checkout-session`,
//           {
//             services: [
//               {
//                 unitPrice,
//                 duration,
//                 bookingType,
//                 service: { name: "Service Booking" },
//               },
//             ],
//             bookingId: bookingDetails.serviceId, 
//             vendorId: bookingDetails.serviceId, 
//           },
//           { withCredentials: true }
//         );

//         if (res.data?.url) {
//           window.location.href = res.data.url;
//         }
//       } catch (error: any) {
//         console.error("Stripe error:", error.response?.data);
//         alert(error?.response?.data?.error || "Payment failed");
//       }
//     } else if (selectedPaymentMethod === "bkash") {
//       navigate("/payment/bkash");
//     } else if (selectedPaymentMethod === "scanner") {
//       navigate("/payment/scanner");
//     }
//   };

//   const paymentMethods = [
//     { id: "scanner", name: "Scanner", color: "bg-blue-600" },
//     { id: "stripe", name: "Stripe", color: "bg-indigo-600" },
//     { id: "bkash", name: "Bkash", color: "bg-blue-500" },
//   ];

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
//       <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
//         <div className="grid lg:grid-cols-5 gap-0">
//           {/* ================= Left Section ================= */}
//           <div className="lg:col-span-2 bg-linear-to-br from-teal-700 to-emerald-800 p-8 sm:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
//               <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
//             </div>

//             <div className="relative z-10 text-center space-y-6 animate-slideInLeft">
//               <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300">
//                 <Layers className="w-12 h-12 text-white animate-float" />
//               </div>

//               <div className="space-y-2">
//                 <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
//                   Payment gateway
//                 </h1>
//                 <p className="text-teal-100 text-sm sm:text-base">
//                   Enter school location details!
//                 </p>
//               </div>

//               <div className="pt-8 space-y-4 opacity-90">
//                 <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 transform hover:translate-x-2 transition-transform duration-300">
//                   <div className="w-2 h-2 bg-emerald-300 rounded-full animate-ping"></div>
//                   <span className="text-sm">Secure payment processing</span>
//                 </div>
//                 <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 transform hover:translate-x-2 transition-transform duration-300 delay-100">
//                   <div className="w-2 h-2 bg-emerald-300 rounded-full animate-ping delay-100"></div>
//                   <span className="text-sm">256-bit SSL encryption</span>
//                 </div>
//                 <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 transform hover:translate-x-2 transition-transform duration-300 delay-200">
//                   <div className="w-2 h-2 bg-emerald-300 rounded-full animate-ping delay-200"></div>
//                   <span className="text-sm">PCI DSS compliant</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ================ Right Section - Form ================ */}
//           <div className="lg:col-span-3 p-8 sm:p-12 animate-slideInRight">
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//               {/* Header */}
//               <div className="space-y-2">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                   Complete registration payment
//                 </h2>
//               </div>

//               {/* ================= Price Info ================= */}
//               <div className="bg-gray-100 rounded-xl p-4 space-y-2">
//                 <p className="text-sm">
//                   <span className="font-semibold">Price type:</span>{" "}
//                   <span className="capitalize">{bookingType}</span>
//                 </p>

//                 <p className="text-sm">
//                   <span className="font-semibold">Duration:</span>{" "}
//                   {duration} {bookingType}
//                 </p>

//                 <p className="text-sm">
//                   <span className="font-semibold">Unit price:</span>{" "}
//                   $ {unitPrice}
//                 </p>

//                 <p className="text-lg font-bold text-teal-700">
//                   Total price: $ {totalPrice}
//                 </p>
//               </div>

//               {/* Personal Details */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold text-gray-900">Personal details</h3>
//               {/* ================= Inputs ================= */}
//               <div className="grid sm:grid-cols-2 gap-4">
//                 {/* Zip */}
//                 <div>
//                   <input
//                     {...register("addressLine")}
//                     placeholder="Address Line"
//                     onFocus={() => setFocusedField("addressLine")}
//                     onBlur={() => setFocusedField(null)}
//                     className={`w-full px-4 py-3 border rounded-lg ${
//                       focusedField === "addressLine"
//                         ? "border-teal-600 ring-2 ring-teal-200"
//                         : "border-gray-300"
//                     }`}
//                   />
//                   {errors.addressLine && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.addressLine.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* City */}
//                 <div>
//                   <input
//                     {...register("city")}
//                     placeholder="City"
//                     onFocus={() => setFocusedField("city")}
//                     onBlur={() => setFocusedField(null)}
//                     className={`w-full px-4 py-3 border rounded-lg ${
//                       focusedField === "city"
//                         ? "border-teal-600 ring-2 ring-teal-200"
//                         : "border-gray-300"
//                     }`}
//                   />
//                   {errors.city && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.city.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* State */}
//                 <div>
//                   <input
//                     {...register("state")}
//                     placeholder="State"
//                     onFocus={() => setFocusedField("state")}
//                     onBlur={() => setFocusedField(null)}
//                     className={`w-full px-4 py-3 border rounded-lg ${
//                       focusedField === "state"
//                         ? "border-teal-600 ring-2 ring-teal-200"
//                         : "border-gray-300"
//                     }`}
//                   />
//                   {errors.state && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.state.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Postal Code */}
//                 <div>
//                   <input
//                     {...register("postalCode")}
//                     placeholder="Postal code"
//                     onFocus={() => setFocusedField("postalCode")}
//                     onBlur={() => setFocusedField(null)}
//                     className={`w-full px-4 py-3 border rounded-lg ${
//                       focusedField === "postalCode"
//                         ? "border-teal-600 ring-2 ring-teal-200"
//                         : "border-gray-300"
//                     }`}
//                   />
//                   {errors.postalCode && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.postalCode.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               </div>

//               {/* ================== Payment Methods ================ */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold text-center text-gray-900">Payment methods</h3>
//                 <div className="flex flex-wrap items-center justify-center gap-3">
//                   {paymentMethods.map((method, index) => (
//                     <button
//                       key={method.id}
//                       type="button"
//                       onClick={() => setSelectedPaymentMethod(method.id)}
//                       className={`cursor-pointer px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
//                         selectedPaymentMethod === method.id
//                           ? 'bg-teal-700 text-white shadow-lg scale-105'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                       style={{
//                         animationDelay: `${index * 100}ms`,
//                       }}
//                     >
//                       {method.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* ================== Submit Button =============== */}
//               <button
//                 type="submit"
//                 className="w-full cursor-pointer bg-linear-to-r from-teal-700 to-emerald-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 hover:from-teal-600 hover:to-emerald-600"
//               >
//                 Payment
//               </button>

//               {/* ================== Footer Links =============== */}
//               <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 pt-4">
//                 <a href="#" className="hover:text-teal-700 transition-colors duration-200">
//                   Instructions
//                 </a>
//                 <span className="text-gray-400">•</span>
//                 <a href="#" className="hover:text-teal-700 transition-colors duration-200">
//                   License
//                 </a>
//                 <span className="text-gray-400">•</span>
//                 <a href="#" className="hover:text-teal-700 transition-colors duration-200">
//                   Terms of Use
//                 </a>
//                 <span className="text-gray-400">•</span>
//                 <a href="#" className="hover:text-teal-700 transition-colors duration-200">
//                   Privacy
//                 </a>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;















// src/pages/payment/Payment.tsx
import { useState } from 'react';
import { Layers } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { paymentSchema, type PaymentFormData } from '@/validations/payment.validation';
import { zodResolver } from "@hookform/resolvers/zod";
import { getBaseUrl } from '@/utils/getBaseUrl ';
import { toast } from 'react-toastify';

const Payment = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>(); 
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("stripe");
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({ resolver: zodResolver(paymentSchema) });

  const bookingDetails = useSelector((state: RootState) => state.service.bookingDetails);

  if (!bookingDetails || !bookingId) {
    navigate("/services");
    return null;
  }

  const { totalPrice, bookingType, duration, unitPrice } = bookingDetails;

  const onSubmit = async (data: PaymentFormData) => {
    console.log("Form data:", data);

    if (selectedPaymentMethod === "stripe") {
      setIsProcessing(true);
      try {
        const res = await axios.post(`${getBaseUrl()}/api/v1/payment/create-checkout-session`,
          {
            bookingId, 
          },
          { withCredentials: true }
        );

        if (res.data?.url) {
          window.location.href = res.data.url;
        }
      } catch (error: any) {
        console.error("Stripe error:", error.response?.data);
        toast.error(error?.response?.data?.error || "Payment failed");
        setIsProcessing(false);
      }
    } else if (selectedPaymentMethod === "bkash") {
      navigate("/payment/bkash");
    } else if (selectedPaymentMethod === "scanner") {
      navigate("/payment/scanner");
    }
  };

  const paymentMethods = [
    { id: "scanner", name: "Scanner", color: "bg-blue-600" },
    { id: "stripe", name: "Stripe", color: "bg-indigo-600" },
    { id: "bkash", name: "Bkash", color: "bg-blue-500" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
        <div className="grid lg:grid-cols-5 gap-0">
          {/* ================= Left Section ================= */}
          <div className="lg:col-span-2 bg-linear-to-br from-teal-700 to-emerald-800 p-8 sm:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 text-center space-y-6 animate-slideInLeft">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Layers className="w-12 h-12 text-white animate-float" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Payment Gateway
                </h1>
                <p className="text-teal-100 text-sm sm:text-base">
                  Complete your booking payment securely
                </p>
              </div>

              <div className="pt-8 space-y-4 opacity-90">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-ping"></div>
                  <span className="text-sm">Secure payment processing</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 transform hover:translate-x-2 transition-transform duration-300 delay-100">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-ping delay-100"></div>
                  <span className="text-sm">256-bit SSL encryption</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 transform hover:translate-x-2 transition-transform duration-300 delay-200">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-ping delay-200"></div>
                  <span className="text-sm">PCI DSS compliant</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================ Right Section - Form ================ */}
          <div className="lg:col-span-3 p-8 sm:p-12 animate-slideInRight">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Header */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Complete Booking Payment
                </h2>
                <p className="text-sm text-gray-600">
                  Booking ID: {bookingId}
                </p>
              </div>

              {/* ================= Price Info ================= */}
              <div className="bg-linear-to-r from-teal-50 to-emerald-50 rounded-xl p-6 space-y-3 border border-teal-100">
                <h3 className="font-semibold text-gray-800 mb-3">Booking Summary</h3>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rental Type:</span>
                  <span className="font-medium capitalize">{bookingType}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">
                    {duration} {bookingType}(s)
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Unit Price:</span>
                  <span className="font-medium">$ {unitPrice}</span>
                </div>

                <div className="border-t border-teal-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                    <span className="text-2xl font-bold text-teal-700">
                      $ {totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* ================ Personal Details =============== */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Billing Address</h3>
                
                {/* ================= Inputs ================= */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* =============== Address Line =============== */}
                  <div className="sm:col-span-2">
                    <input
                      {...register("addressLine")}
                      placeholder="Address Line"
                      onFocus={() => setFocusedField("addressLine")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                        focusedField === "addressLine"
                          ? "border-teal-600 ring-2 ring-teal-200"
                          : "border-gray-300"
                      } ${errors.addressLine ? "border-red-500" : ""}`}
                    />
                    {errors.addressLine && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.addressLine.message}
                      </p>
                    )}
                  </div>

                  {/* ================ City ================ */}
                  <div>
                    <input
                      {...register("city")}
                      placeholder="City"
                      onFocus={() => setFocusedField("city")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                        focusedField === "city"
                          ? "border-teal-600 ring-2 ring-teal-200"
                          : "border-gray-300"
                      } ${errors.city ? "border-red-500" : ""}`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  {/* ================ State ================ */}
                  <div>
                    <input
                      {...register("state")}
                      placeholder="State"
                      onFocus={() => setFocusedField("state")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                        focusedField === "state"
                          ? "border-teal-600 ring-2 ring-teal-200"
                          : "border-gray-300"
                      } ${errors.state ? "border-red-500" : ""}`}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  {/* =============== Postal Code =============== */}
                  <div className="sm:col-span-2">
                    <input
                      {...register("postalCode")}
                      placeholder="Postal Code"
                      onFocus={() => setFocusedField("postalCode")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                        focusedField === "postalCode"
                          ? "border-teal-600 ring-2 ring-teal-200"
                          : "border-gray-300"
                      } ${errors.postalCode ? "border-red-500" : ""}`}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ================== Payment Methods ================ */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Select Payment Method</h3>
                <div className="grid grid-cols-3 gap-3">
                  {paymentMethods.map((method, index) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`cursor-pointer px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedPaymentMethod === method.id
                          ? 'bg-teal-700 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      {method.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* ================== Submit Button =============== */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full cursor-pointer py-4 rounded-lg font-semibold text-lg shadow-lg transform transition-all duration-300 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-linear-to-r from-teal-700 to-emerald-700 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] hover:from-teal-600 hover:to-emerald-600'
                }`}
              >
                {isProcessing ? 'Processing...' : `Pay $ ${totalPrice}`}
              </button>

              {/* ================== Footer Links =============== */}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 pt-4">
                <a href="#" className="hover:text-teal-700 transition-colors duration-200">
                  Terms of Use
                </a>
                <span className="text-gray-400">•</span>
                <a href="#" className="hover:text-teal-700 transition-colors duration-200">
                  Privacy Policy
                </a>
                <span className="text-gray-400">•</span>
                <a href="#" className="hover:text-teal-700 transition-colors duration-200">
                  Refund Policy
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;


