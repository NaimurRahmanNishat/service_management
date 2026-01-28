// src/components/shared/SearchBar.tsx
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => { 
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/services?search=${encodeURIComponent(query.trim())}`);
  };
  return (
    <div className="mx-auto md:w-full md:max-w-xl">
      <form onSubmit={handleSubmit}>
        <div className="relative hidden md:flex items-center">
          {/* 🔍 Clickable Search Icon */}
          <button
            type="submit"
            className="absolute cursor-pointer left-3 flex items-center justify-center text-gray-400 hover:text-blue-500 transition"
          >
            <Search className="h-5 w-5 cursor-pointer" />
          </button>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services..."
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition
            dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
