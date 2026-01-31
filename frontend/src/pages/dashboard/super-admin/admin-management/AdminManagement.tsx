// src/pages/dashboard/super-admin/admin-management/AdminManagement.tsx
import { motion } from "framer-motion";
import type { IUser } from "@/types/userType";
import Loading from "@/components/shared/Loading";
import { useState } from "react";
import { useGetAllUsersQuery } from "@/redux/features/users/userApi";
import { AuroraText } from "@/components/ui/AuroraText";

const ITEMS_PER_PAGE = 10;


const AdminManagement = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useGetAllUsersQuery({role: "admin"});
    const admins = data?.data || [];
  
    // Pagination Logic
    const totalPages = Math.ceil(admins.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedUsers = admins.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
    if (isLoading) return <Loading />;
    if (error) return <div>Failed to load users!</div>;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="py-4"
    >
      <h2 className="text-2xl text-center font-semibold mb-6">
        <AuroraText> All Admin List</AuroraText>
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-semibold">SL</th>
              <th className="p-3 text-left font-semibold">Name</th>
              <th className="p-3 text-left font-semibold">Email</th>
              <th className="p-3 text-left font-semibold">Phone</th>
              <th className="p-3 text-left font-semibold">Post Code</th>
              <th className="p-3 text-left font-semibold">City</th>
              <th className="p-3 text-left font-semibold">Division</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user: IUser, index: number) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{startIndex + index + 1}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone || "N/A"}</td>
                <td className="p-3">{user?.address?.postalCode || "N/A"}</td>
                <td className="p-3">{user?.address?.city || "N/A"}</td>
                <td className="p-3">{user?.address?.division || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-700 text-white hover:bg-gray-800"
          }`}
        >
          Previous
        </button>

        <span className="text-lg font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-700 text-white hover:bg-gray-900"
          }`}
        >
          Next
        </button>
      </div>
    </motion.div>
  )
}

export default AdminManagement;