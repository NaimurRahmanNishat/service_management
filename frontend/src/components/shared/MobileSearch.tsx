// src/components/shared/MobileSearch.tsx
import { useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MobileSearch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/services?search=${encodeURIComponent(query.trim())}`);
    setIsOpen(false);
    setQuery("");
  };

  // Close modal and reset
  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative">
      {/* Search Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-700 cursor-pointer pt-1.5 hover:text-[#239c47] transition"
        aria-label="Open search"
      >
        <Search size={24} />
      </button>

      {/* Search Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Blur */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Centered Search Box */}
            <motion.div
              className="fixed top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/6 w-[95%] sm:w-125 md:w-162.5 lg:w-187.5 bg-white rounded-2xl shadow-2xl z-50 p-6 border border-gray-200"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Search Services
                </h2>
                <button onClick={handleClose} aria-label="Close search">
                  <X
                    size={22}
                    className="text-gray-600 cursor-pointer hover:text-red-500 transition"
                  />
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search services..."
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#239c47] focus:border-[#239c47] shadow-sm transition"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#239c47] transition cursor-pointer"
                    aria-label="Search"
                  >
                    <Search size={18} />
                  </button>
                </div>

                {/* Search hint */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Type your search and press Enter or click the search icon
                  </p>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileSearch;
