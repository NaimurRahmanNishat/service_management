/* eslint-disable @typescript-eslint/no-explicit-any */
// // src/pages/ServiceDetails.tsx

// import Loading from "@/components/shared/Loading";
// import { useGetSingleServiceDataQuery } from "@/redux/features/service/serviceApi";
// import type { IService } from "@/types/serviceType";
// import { useNavigate, useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight, Star } from "lucide-react";
// import type { RootState } from "@/redux/store";
// import { useDispatch, useSelector } from "react-redux";
// import { setBookingDetails, setBookingType, setSelectedService } from "@/redux/features/service/serviceSlice";

// export type paymentType = "scanner" | "card" | "bkash";

// const ServiceDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [selectedImage, setSelectedImage] = useState<number>(0);
//   const [quantity, setQuantity] = useState(1);

//   const {user} = useSelector((state: RootState) => state.auth);
//   const { selectedBookingType } = useSelector((state: RootState) => state.service);

//   const { data, isLoading } = useGetSingleServiceDataQuery(id!, {skip: !id});

//   const service: IService | undefined = data?.data;
//   const images = service?.product?.images ?? [];

//   /* ================= Image controls ================= */
//   const nextImage = () => {
//     setSelectedImage((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = () => {
//     setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
//   };

//   useEffect(() => {
//     if (service) {
//       dispatch(setSelectedService(service));
//     }
//   }, [service, dispatch]);


//   const handleClick = () => {
//     if(!user){
//       navigate("/login", { state: { from: location.pathname }, replace: true });
//       return;
//     }
//     if (!service || !selectedBookingType) return;

//     const unitPrice = service.price[selectedBookingType] ?? 0;
//     const totalPrice = unitPrice * quantity;

//     dispatch(
//       setBookingDetails({
//         serviceId: service._id, 
//         bookingType: selectedBookingType,
//         startDate: new Date().toISOString(),
//         endDate: new Date().toISOString(),
//         duration: quantity,
//         unitPrice,
//         totalPrice,
//       })
//     );

//     navigate(`/payment/${service._id}`);
//   };

//   if (isLoading) return <Loading />;
//   if (!service) return <p className="text-center">Service not found</p>;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="container mx-auto px-4 py-10"
//     >
//       <div className="grid lg:grid-cols-2 gap-10">
//         {/* ================= Image Gallery ================= */}
//         <div className="space-y-4">
//           <div className="relative group overflow-hidden rounded-2xl bg-gray-100">
//             <img
//               src={images[selectedImage]?.url}
//               alt={service.product.name}
//               className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
//             />

//             {/* Controls */}
//             {images.length > 1 && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow transition opacity-0 group-hover:opacity-100"
//                 >
//                   <ChevronLeft className="w-6 h-6" />
//                 </button>

//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow transition opacity-0 group-hover:opacity-100"
//                 >
//                   <ChevronRight className="w-6 h-6" />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Thumbnails */}
//           <div className="grid grid-cols-4 gap-3">
//             {images.map((img, idx) => (
//               <button
//                 key={img.url}
//                 onClick={() => setSelectedImage(idx)}
//                 className={`rounded-lg overflow-hidden border-2 transition ${
//                   selectedImage === idx
//                     ? "border-blue-500 scale-105 shadow"
//                     : "border-gray-200 hover:border-gray-300"
//                 }`}
//               >
//                 <img
//                   src={img.url}
//                   alt={`View ${idx + 1}`}
//                   className="w-full h-20 object-cover"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ================= Details ================= */}
//         <div className="space-y-4">
//           {/* ================= Title ================= */}
//           <h1 className="text-xl font-semibold mb-6 bg-linear-to-r from-pink-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">{service?.product?.name}</h1>
          
//           {/* ================= Availability ================= */}
//           <div className="flex items-center gap-2">
//             <div>
//               {service?.isAvailable ? (
//                 <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-green-200">
//                   <p className="text-green-600">In stock</p>
//                 </div>
//               ) : (
//                 <p className="text-red-600">Out of stock</p>
//               )}
//             </div>
//             <div className="flex items-center gap-2">
//               <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />{" "}
//               <span className="font-semibold">
//                 {service?.product?.rating?.average}
//               </span>
//               <span className="text-gray-600 font-medium">({service?.product?.rating?.count} reviews)</span>
//             </div>
//           </div>
//           {/* ================= Category ================= */}
//           <p>
//             <span className="font-semibold">Category:</span>{" "}
//             {service?.product?.category}
//           </p>

//           {/* ================= Location ================= */}
//           <p>
//             <span className="font-semibold">Location:</span>{" "}
//             {service?.location?.district}, {service?.location?.subArea}
//           </p>

//           {/* ================= Stock ================= */}
//           <p>
//             <span className="font-semibold">Stock:</span>{" "}
//             {service?.product?.quantity}
//           </p>

//           {/* ================= Price ================= */}
//           <div className="flex items-center gap-4">
//             {service?.rentOptions?.daily && (
//               <button
//                 onClick={() => dispatch(setBookingType("daily"))}
//                 className={`px-4 py-2 border rounded-lg font-semibold transition
//                   ${selectedBookingType === "daily"
//                     ? "bg-blue-600 text-white"
//                     : "text-blue-600"}`}
//               >
//                 $ {service.price.daily} / day
//               </button>
//             )}

//             {service?.rentOptions?.monthly && (
//               <button
//                 onClick={() => dispatch(setBookingType("monthly"))}
//                 className={`px-4 py-2 border rounded-lg font-semibold transition
//                   ${selectedBookingType === "monthly"
//                     ? "bg-green-600 text-white"
//                     : "text-green-600"}`}
//               >
//                 $ {service.price.monthly} / month
//               </button>
//             )}

//             {service?.rentOptions?.yearly && (
//               <button
//                 onClick={() => dispatch(setBookingType("yearly"))}
//                 className={`px-4 py-2 border rounded-lg font-semibold transition
//                   ${selectedBookingType === "yearly"
//                     ? "bg-violet-600 text-white"
//                     : "text-violet-600"}`}
//               >
//                 $ {service.price.yearly} / year
//               </button>
//             )}
//           </div>

//           {/* ================= increment and decrement (quantity button) ================= */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="flex items-center gap-4 mt-4"
//           >
//             <span className="font-semibold">Quantity:</span>

//             <div className="flex items-center border rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                 className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
//               >
//                 −
//               </button>

//               <span className="px-6 font-semibold">{quantity}</span>

//               <button
//                 onClick={() => setQuantity((q) => q + 1)}
//                 className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
//               >
//                 +
//               </button>
//             </div>
//           </motion.div>

//           {/* ================= total price ================= */}
//           {selectedBookingType && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.3 }}
//               className="mt-4 p-4 max-w-xs bg-gray-100 rounded-xl"
//             >
//               <p className="text-lg font-semibold">
//                 Total Price:{" "}
//                 <span className="text-blue-600">
//                   ${" "}
//                   {quantity *
//                     (service.price[selectedBookingType] ?? 0)}
//                 </span>
//               </p>
//             </motion.div>
//           )}

//           <button onClick={handleClick} className="cursor-pointer mt-4 w-fit px-16 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition">
//             Book Service
//           </button>
//         </div>
//       </div>
//       {/* ================= Description ================= */}
//       <div className="mt-8">
//         <p className="text-gray-600">{service.product.description}</p>
//       </div>
//     </motion.div>
//   );
// };

// export default ServiceDetails;





























// src/pages/ServiceDetails.tsx

import Loading from "@/components/shared/Loading";
import { useGetSingleServiceDataQuery } from "@/redux/features/service/serviceApi";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";
import type { IService } from "@/types/serviceType";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setBookingDetails, setBookingType, setSelectedService } from "@/redux/features/service/serviceSlice";
import { toast } from "react-toastify";

export type paymentType = "scanner" | "card" | "bkash";

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedBookingType } = useSelector((state: RootState) => state.service);

  const { data, isLoading } = useGetSingleServiceDataQuery(id!, { skip: !id });
  const [createBooking, { isLoading: isCreatingBooking }] = useCreateBookingMutation();

  const service: IService | undefined = data?.data;
  const images = service?.product?.images ?? [];

  /* ================= Image controls ================= */
  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (service) {
      dispatch(setSelectedService(service));
    }
  }, [service, dispatch]);

  /* ================= Handle Book Service ================= */
  const handleBookService = async () => {
    // 1. Check if user is logged in
    if (!user) {
      navigate("/login", { state: { from: location.pathname }, replace: true });
      return;
    }

    // 2. Validate selections
    if (!service || !selectedBookingType) {
      toast.error("Please select a booking type");
      return;
    }

    if (!startDate) {
      toast.error("Please select a start date");
      return;
    }

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    // 3. Check stock availability
    if (quantity > service.product.quantity) {
      toast.error(`Only ${service.product.quantity} items available in stock`);
      return;
    }

    // 4. Prepare booking data
    const unitPrice = service.price[selectedBookingType] ?? 0;
    const totalPrice = unitPrice * quantity;

    const bookingData = {
      serviceId: service._id,
      bookingType: selectedBookingType,
      duration: quantity,
      startDate,
      quantity,
      notes: "", // Optional: You can add a notes field in the form
    };

    try {
      // 5. Create booking
      const response = await createBooking(bookingData).unwrap();

      if (response.success) {
        toast.success("Booking created successfully!");

        // 6. Store booking details in Redux for payment page
        dispatch(
          setBookingDetails({
            bookingId: response.data._id,  // ✅ Real booking ID
            serviceId: service._id,
            vendorId: response.data.vendor, // ✅ Real vendor ID
            productId: response.data.product, // ✅ Product ID
            bookingType: selectedBookingType,
            startDate,
            endDate: response.data.endDate,
            duration: quantity,
            unitPrice,
            totalPrice,
            quantity,
          })
        );

        // 7. Navigate to payment page
        navigate(`/payment/${response.data._id}`);
      }
    } catch (error: any) {
      console.error("Booking Error:", error);
      toast.error(error?.data?.message || "Failed to create booking");
    }
  };

  if (isLoading) return <Loading />;
  if (!service) return <p className="text-center">Service not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-10"
    >
      <div className="grid lg:grid-cols-2 gap-10">
        {/* ================= Image Gallery ================= */}
        <div className="space-y-4">
          <div className="relative group overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={images[selectedImage]?.url}
              alt={service.product.name}
              className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow transition opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow transition opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <button
                key={img.url}
                onClick={() => setSelectedImage(idx)}
                className={`rounded-lg overflow-hidden border-2 transition ${
                  selectedImage === idx
                    ? "border-blue-500 scale-105 shadow"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={img.url}
                  alt={`View ${idx + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ================= Details ================= */}
        <div className="space-y-4">
          {/* ================= Title ================= */}
          <h1 className="text-xl font-semibold mb-6 bg-linear-to-r from-pink-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            {service?.product?.name}
          </h1>

          {/* ================= Availability ================= */}
          <div className="flex items-center gap-2">
            <div>
              {service?.isAvailable ? (
                <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-green-200">
                  <p className="text-green-600">In stock</p>
                </div>
              ) : (
                <p className="text-red-600">Out of stock</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />{" "}
              <span className="font-semibold">
                {service?.product?.rating?.average}
              </span>
              <span className="text-gray-600 font-medium">
                ({service?.product?.rating?.count} reviews)
              </span>
            </div>
          </div>

          {/* ================= Category ================= */}
          <p>
            <span className="font-semibold">Category:</span>{" "}
            {service?.product?.category}
          </p>

          {/* ================= Location ================= */}
          <p>
            <span className="font-semibold">Location:</span>{" "}
            {service?.location?.district}, {service?.location?.subArea}
          </p>

          {/* ================= Stock ================= */}
          <p>
            <span className="font-semibold">Stock:</span>{" "}
            {service?.product?.quantity}
          </p>

          {/* ================= Price Options ================= */}
          <div className="flex items-center gap-4 flex-wrap">
            {service?.rentOptions?.daily && (
              <button
                onClick={() => dispatch(setBookingType("daily"))}
                className={`px-4 py-2 border rounded-lg font-semibold transition ${
                  selectedBookingType === "daily"
                    ? "bg-blue-600 text-white"
                    : "text-blue-600"
                }`}
              >
                $ {service.price.daily} / day
              </button>
            )}

            {service?.rentOptions?.monthly && (
              <button
                onClick={() => dispatch(setBookingType("monthly"))}
                className={`px-4 py-2 border rounded-lg font-semibold transition ${
                  selectedBookingType === "monthly"
                    ? "bg-green-600 text-white"
                    : "text-green-600"
                }`}
              >
                $ {service.price.monthly} / month
              </button>
            )}

            {service?.rentOptions?.yearly && (
              <button
                onClick={() => dispatch(setBookingType("yearly"))}
                className={`px-4 py-2 border rounded-lg font-semibold transition ${
                  selectedBookingType === "yearly"
                    ? "bg-violet-600 text-white"
                    : "text-violet-600"
                }`}
              >
                $ {service.price.yearly} / year
              </button>
            )}
          </div>

          {/* ================= Start Date ================= */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4 mt-4"
          >
            <span className="font-semibold">Start Date:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="px-4 py-2 border rounded-lg"
            />
          </motion.div>

          {/* ================= Quantity ================= */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4 mt-4"
          >
            <span className="font-semibold">Duration:</span>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
              >
                −
              </button>

              <span className="px-6 font-semibold">{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((q) =>
                    Math.min(service.product.quantity, q + 1)
                  )
                }
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>

            <span className="text-sm text-gray-600">
              {selectedBookingType === "daily"
                ? `${quantity} day(s)`
                : selectedBookingType === "monthly"
                  ? `${quantity} month(s)`
                  : `${quantity} year(s)`}
            </span>
          </motion.div>

          {/* ================= Total Price ================= */}
          {selectedBookingType && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 max-w-xs bg-gray-100 rounded-xl"
            >
              <p className="text-lg font-semibold">
                Total Price:{" "}
                <span className="text-blue-600">
                  $ {quantity * (service.price[selectedBookingType] ?? 0)}
                </span>
              </p>
            </motion.div>
          )}

          {/* ================= Book Button ================= */}
          <button
            onClick={handleBookService}
            disabled={isCreatingBooking || !selectedBookingType}
            className={`cursor-pointer mt-4 w-fit px-16 py-3 rounded-xl transition ${
              isCreatingBooking || !selectedBookingType
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isCreatingBooking ? "Creating Booking..." : "Book Service"}
          </button>
        </div>
      </div>

      {/* ================= Description ================= */}
      <div className="mt-8">
        <p className="text-gray-600">{service.product.description}</p>
      </div>
    </motion.div>
  );
};

export default ServiceDetails;



