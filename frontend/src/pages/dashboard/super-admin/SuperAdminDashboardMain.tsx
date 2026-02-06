// src/pages/dashboard/super-admin/SuperAdminDashboardMain.tsx
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Tooltip, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { useGetSuperAdminStatsQuery } from "@/redux/features/stats/statsApi";
import type { ICategoryRevenue } from "@/types/statsType";
import Loading from "@/components/shared/Loading";
import { AuroraText } from "@/components/ui/AuroraText";
import formatNumber from "@/utils/formatNumber";

/* ================= CONSTANTS ================= */
const COLORS = ["#8AE645", "#45E68D", "#3CC8E8", "#B43CE8", "#3154E0", "#E031B7", "#EB813B", "#F23D61"];
const MONTHS = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

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

const SuperAdminDashboardMain = () => {
  const [, setActiveIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const { data, isLoading, isError } = useGetSuperAdminStatsQuery();

  /* ================= SAFE DESTRUCTURING ================= */
  const {
    stats,
    productStats,
    serviceUserStats,
    categoryRevenue = [],
    monthlyStats = [],
  } = data ?? {};

  const userServiceRows = serviceUserStats?.users?.slice(0, 10) ?? [];
  const vendorProductRows = productStats?.vendors?.slice(0, 10) ?? [];

  /* ================= PIE DATA ================= */
  const pieData = useMemo(
    () =>
      categoryRevenue.map((item: ICategoryRevenue) => ({
        name: item.category,
        value: item.totalRevenue,
      })),
    [categoryRevenue],
  );

  /* ================= LINE DATA ================= */
  const lineData = useMemo(() => {
    if (!monthlyStats.length) return [];

    const yearData = monthlyStats.filter((item) => item.year === selectedYear);

    const base = MONTHS.map((month) => ({
      month,
      users: 0,
      revenue: 0,
    }));

    yearData.forEach((item) => {
      const index = item.month - 1;
      if (index >= 0 && index < 12) {
        base[index].users = item.totalUsers;
        base[index].revenue = item.totalRevenue;
      }
    });

    return base;
  }, [monthlyStats, selectedYear]);

  /* ================= STATES ================= */
  if (isLoading) return <Loading />;
  if (isError)
    return <div className="p-6 text-red-500">Failed to load dashboard</div>;

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
          <p className="text-slate-800 font-semibold">{formatNumber(stats?.totalRevenue ?? 0)}</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white shadow border rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
        >
          <h3 className="text-xl font-bold ">
            <AuroraText>Admin Profit</AuroraText>
          </h3> 
          <p className="text-slate-800 font-semibold">{formatNumber(stats?.adminProfit ?? 0)}</p>
        </motion.div>
        
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white shadow border rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
        >
          <h3 className="text-xl font-bold ">
            <AuroraText>Vendor Commission</AuroraText>
          </h3> 
          <p className="text-slate-800 font-semibold">{formatNumber(stats?.vendorCommission ?? 0)}</p>
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
          <p className="text-slate-800 font-semibold">{formatNumber(productStats?.totalProducts ?? 0)}</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white shadow border rounded-lg h-40 flex flex-col gap-2 items-center justify-center"
        >
          <h3 className="text-xl font-bold ">
            <AuroraText>Service Users</AuroraText>
          </h3> 
          <p className="text-slate-800 font-semibold">{formatNumber(serviceUserStats?.totalUsers ?? 0)}</p>
        </motion.div>
      </motion.div>

      {/* ================= MIDDLE SECTION ================= */}
      <div className="flex flex-col md:flex-row gap-4 w-full pb-10">
        {/* PIE CHART */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[50%] h-[440px] min-h-[440px] flex items-center justify-center"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={200}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* LINE CHART */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full lg:w-[50%] h-[440px] min-h-[440px]"
        >
          <div className="flex justify-end mb-2 relative">
            <input
              type="date"
              value={`${selectedYear}-01-01`}
              onChange={(e) =>
                setSelectedYear(new Date(e.target.value).getFullYear())
              }
              className="border rounded px-3 py-1 text-sm pl-9"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              📅
            </span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* USER TABLE */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="bg-white shadow rounded-md border overflow-hidden"
        >
          <div className="px-4 py-3 border-b font-semibold">
            User Service Stats (Top 10)
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 border-b">User ID</th>
                <th className="text-right px-4 py-2 border-b">
                  Services Taken
                </th>
              </tr>
            </thead>
            <tbody>
              {userServiceRows.map((row, index) => (
                <motion.tr
                  key={row.user}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-2 border-b text-xs break-all">
                    {row.user}
                  </td>
                  <td className="px-4 py-2 border-b text-right font-medium">
                    {row.servicesTaken}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* VENDOR TABLE */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="bg-white shadow rounded-md border overflow-hidden"
        >
          <div className="px-4 py-3 border-b font-semibold">
            Vendor Product Stats (Top 10)
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 border-b">Vendor ID</th>
                <th className="text-right px-4 py-2 border-b">
                  Total Products
                </th>
              </tr>
            </thead>
            <tbody>
              {vendorProductRows.map((row, index) => (
                <motion.tr
                  key={row.vendor}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-2 border-b text-xs break-all">
                    {row.vendor}
                  </td>
                  <td className="px-4 py-2 border-b text-right font-medium">
                    {row.products}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SuperAdminDashboardMain;
