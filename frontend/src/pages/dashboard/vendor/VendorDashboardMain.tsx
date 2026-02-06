/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/dashboard/vendor/VendorDashboardMain.tsx

import { AuroraText } from "@/components/ui/AuroraText";
import formatNumber from "@/utils/formatNumber";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
ChartJS.register( ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement );



/* ================= ANIMATION VARIANTS ================= */
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const VendorDashboardMain = () => {

  const doughnutData = {
    labels: ["technology", "health", "lifestyle", "fitness", "house", "land", "vehicle", "others"],
    datasets: [
      {
        label: "Services",
        data: [300, 120, 80, 50, 100, 150, 200, 250],
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#ef4444",
          "#f59e0b",
          "#22c55e",
          "#3b82f6",
          "#ef4444",
          "#f59e0b",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 3000, 2500, 3200, 4000, 2800, 3600, 4200, 3800, 4800, 5200],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: any) => `$${value}`,
        },
      },
    },
  };


  return (
    <motion.div
      className="min-h-screen w-full flex flex-col gap-4 md:gap-8 pt-2 md:pt-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* ================= TOP SECTION ================= */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full"
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white shadow border rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
        >
          <h3 className="text-xl font-bold ">
            <AuroraText>Total Revenue</AuroraText>
          </h3>
          <p className="text-slate-800 font-semibold">{formatNumber(10000)}</p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white shadow border rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
        >
          <h3 className="text-xl font-bold ">
            <AuroraText>Total Service User</AuroraText>
          </h3>
          <p className="text-slate-800 font-semibold">{formatNumber(10000)}</p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white shadow border rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
        >
          <h3 className="text-xl font-bold ">
            <AuroraText>Total Service Provide</AuroraText>
          </h3>
          <p className="text-slate-800 font-semibold">{formatNumber(10000)}</p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white shadow border rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
        >
          <h3 className="text-xl font-bold ">
            <AuroraText>Total Products</AuroraText>
          </h3>
          <p className="text-slate-800 font-semibold">{formatNumber(10000)}</p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white shadow border rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
        >
          <h3 className="text-xl font-bold ">
            <AuroraText>My Commission</AuroraText>
          </h3>
          <p className="text-slate-800 font-semibold">{formatNumber(10000)}</p>
        </motion.div>
      </motion.div>

      {/* ================= MIDDLE SECTION ================= */}
      <div className="flex flex-col md:flex-row gap-4 w-full pb-10">
        {/* left side */}
        <div className="w-full lg:w-[50%] h-[440px] bg-white shadow border rounded-lg p-4 flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-center">
            <AuroraText>Overview</AuroraText>
          </h3>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center h-full">
            {/* Doughnut Chart */}
            <div className="w-[360px] h-[360px]">
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full lg:w-[50%] h-[440px] flex flex-col gap-4">
          <div className="w-full h-full bg-white shadow border rounded-lg p-4 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-center">
              <AuroraText>Revenue Trend</AuroraText>
            </h3>
            <div className="flex-1">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>

      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* left side */}
        <div className="w-full h-60 bg-white shadow rounded-md border">
          Available service list
        </div>
        {/* right side */}
        <div className="w-full h-60 bg-white shadow rounded-md border">
          Available product list
        </div>
      </div>
    </motion.div>
  );
};

export default VendorDashboardMain;

















































// // src/pages/dashboard/vendor/VendorDashboardMain.tsx

// import { AuroraText } from "@/components/ui/AuroraText";
// import formatNumber from "@/utils/formatNumber";
// import { motion } from "framer-motion";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
// import { Doughnut, Line } from "react-chartjs-2";
// import { useGetVendorStatsQuery } from "@/redux/features/stats/statsApi";
// import { useMemo } from "react";
// ChartJS.register( ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement );



// /* ================= ANIMATION VARIANTS ================= */
// const fadeIn = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
// };

// const fadeUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// const stagger = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.1 },
//   },
// };

// const VendorDashboardMain = () => {

//   const { data, isLoading, error } = useGetVendorStatsQuery();
//   console.log(data);

//   const totalRevenue = data?.stats.totalRevenue || 0;
//   const myCommission = data?.stats.myCommission || 0;
//   const totalServiceUsers = data?.serviceUserStats.totalUsers || 0;
//   const totalServicesProvided = data?.serviceUserStats.users.reduce((acc, u) => acc + u.servicesTaken, 0) || 0;
//   const totalProducts = data?.productStats.totalProducts || 0;

//   const doughnutData = useMemo(() => {
//     if (!data) return { labels: [], datasets: [] };

//     return {
//       labels: data.categoryRevenue.map(c => c.category),
//       datasets: [
//         {
//           label: "Revenue by Category",
//           data: data.categoryRevenue.map(c => c.totalRevenue),
//           backgroundColor: [
//             "#22c55e","#3b82f6","#ef4444","#f59e0b","#10b981","#8b5cf6","#f43f5e","#facc15",
//           ],
//           borderWidth: 1,
//         },
//       ],
//     };
//   }, [data]);


//   const lineData = useMemo(() => {
//     if (!data) return { labels: [], datasets: [] };

//     // Month labels in order
//     const months = [
//       "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
//     ];

//     return {
//       labels: months,
//       datasets: [
//         {
//           label: "Revenue",
//           data: months.map((_, i) => {
//             const monthData = data.monthlyStats.find(m => m.month === i+1);
//             return monthData?.totalRevenue || 0;
//           }),
//           borderColor: "#6366f1",
//           backgroundColor: "rgba(99, 102, 241, 0.2)",
//           tension: 0.4,
//           fill: true,
//           pointRadius: 4,
//         },
//       ],
//     };
//   }, [data]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Failed to load stats</div>;

//   return (
//     <motion.div
//       className="min-h-screen w-full flex flex-col gap-4 md:gap-8 pt-2 md:pt-8"
//       initial="hidden"
//       animate="visible"
//       variants={fadeIn}
//     >
//       {/* ================= TOP SECTION ================= */}
//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full"
//         variants={stagger}
//       >
//         <motion.div
//           variants={fadeUp}
//           whileHover={{ scale: 1.03 }}
//           transition={{ type: "spring", stiffness: 200 }}
//           className="bg-white shadow border rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
//         >
//           <h3 className="text-xl font-bold ">
//             <AuroraText>Total Revenue</AuroraText>
//           </h3>
//           <p className="text-slate-800 font-semibold">{formatNumber(totalRevenue)}</p>
//         </motion.div>
//         <motion.div
//           variants={fadeUp}
//           whileHover={{ scale: 1.03 }}
//           transition={{ type: "spring", stiffness: 200 }}
//           className="bg-white shadow border rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
//         >
//           <h3 className="text-xl font-bold ">
//             <AuroraText>Total Service User</AuroraText>
//           </h3>
//           <p className="text-slate-800 font-semibold">{formatNumber(totalServiceUsers)}</p>
//         </motion.div>
//         <motion.div
//           variants={fadeUp}
//           whileHover={{ scale: 1.03 }}
//           transition={{ type: "spring", stiffness: 200 }}
//           className="bg-white shadow border rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
//         >
//           <h3 className="text-xl font-bold ">
//             <AuroraText>Total Service Provide</AuroraText>
//           </h3>
//           <p className="text-slate-800 font-semibold">{formatNumber(totalServicesProvided)}</p>
//         </motion.div>
//         <motion.div
//           variants={fadeUp}
//           whileHover={{ scale: 1.03 }}
//           transition={{ type: "spring", stiffness: 200 }}
//           className="bg-white shadow border rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
//         >
//           <h3 className="text-xl font-bold ">
//             <AuroraText>Total Products</AuroraText>
//           </h3>
//           <p className="text-slate-800 font-semibold">{formatNumber(totalProducts)}</p>
//         </motion.div>
//         <motion.div
//           variants={fadeUp}
//           whileHover={{ scale: 1.03 }}
//           transition={{ type: "spring", stiffness: 200 }}
//           className="bg-white shadow border rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
//         >
//           <h3 className="text-xl font-bold ">
//             <AuroraText>My Commission</AuroraText>
//           </h3>
//           <p className="text-slate-800 font-semibold">{formatNumber(myCommission)}</p>
//         </motion.div>
//       </motion.div>

//       {/* ================= MIDDLE SECTION ================= */}
//       <div className="flex flex-col md:flex-row gap-4 w-full pb-10">
//         {/* left side */}
//         <div className="w-full lg:w-[50%] h-[440px] bg-white shadow border rounded-lg p-4 flex flex-col gap-4">
//           <h3 className="text-lg font-semibold text-center">
//             <AuroraText>Overview</AuroraText>
//           </h3>
//           <div className="flex flex-col md:flex-row gap-6 items-center justify-center h-full">
//             {/* Doughnut Chart */}
//             <div className="w-[360px] h-[360px]">
//               <Doughnut data={doughnutData} />
//             </div>
//           </div>
//         </div>

//         {/* right side */}
//         <div className="w-full lg:w-[50%] h-[440px] flex flex-col gap-4">
//           <div className="w-full h-full bg-white shadow border rounded-lg p-4 flex flex-col gap-2">
//             <h3 className="text-lg font-semibold text-center">
//               <AuroraText>Revenue Trend</AuroraText>
//             </h3>
//             <div className="flex-1">
//               <Line data={lineData} options={lineOptions} />
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* ================= BOTTOM SECTION ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* left side */}
//         <div className="w-full h-60 bg-white shadow rounded-md border">
//           Available service list
//         </div>
//         {/* right side */}
//         <div className="w-full h-60 bg-white shadow rounded-md border">
//           Available product list
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default VendorDashboardMain;

