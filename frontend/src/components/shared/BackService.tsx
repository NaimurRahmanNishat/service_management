// src/components/shared/BackService.tsx
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackService = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
        <p className="text-xl text-gray-500">Service not found</p>
        <button
          onClick={() => navigate("/services")}
          className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          Back to Services
        </button>
      </motion.div>
    </div>
  );
};

export default BackService;
