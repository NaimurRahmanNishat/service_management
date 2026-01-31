// src/pages/services/Services.tsx

import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllServiceDataQuery } from "@/redux/features/service/serviceApi";
import { useEffect, useState } from "react";
import type { IService } from "@/types/serviceType";
import ServiceCard from "./ServiceCard";
import { useSearchParams } from "react-router-dom";

export type PriceSort = "lowToHigh" | "highToLow" | undefined;

const Services = () => {
  const [cursor, setCursor] = useState<string | null>(null);
  const [services, setServices] = useState<IService[]>([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [priceSort, setPriceSort] = useState<PriceSort>(undefined);

const { data, isFetching } = useGetAllServiceDataQuery({
  limit: 10,
  cursor: cursor ?? undefined,
  sortBy: "createdAt",
  sortOrder,
  search
});


  /* ================== Merge paginated data ================== */
  useEffect(() => {
    if (data?.data) {
      setServices((prev) =>
        cursor ? [...prev, ...data.data] : data.data
      );
    }
  }, [data, cursor]);

  /* ================== Infinite Scroll ================== */
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        data?.meta?.hasMore &&
        data?.meta?.nextCursor &&
        !isFetching
      ) {
        setCursor(data.meta.nextCursor);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [data, isFetching]);


  /* ================== Price sorting  ================== */
  const getLowestPrice = (price?: { daily?: number; monthly?: number; yearly?: number;}) => {
    if (!price) return 0;
    const values = Object.values(price).filter(
      (v): v is number => typeof v === "number"
    );
    return values.length ? Math.min(...values) : 0;
  };

  const displayedServices = [...services].sort((a, b) => {
    const priceA = getLowestPrice(a.price);
    const priceB = getLowestPrice(b.price);

    if (priceSort === "lowToHigh") {
      return priceA - priceB;
    }
    if (priceSort === "highToLow") {
      return priceB - priceA;
    }
    return 0;
  });


  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 md:py-16">

        {/* ================= Title ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            Our Services
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover premium services tailored to your needs
          </p>
        </motion.div>

        {/* ================= Filters ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-10 flex flex-col lg:flex-row gap-4 justify-between"
        >

          {/* Date sort */}
          <Select
            onValueChange={(value) => {
              setSortOrder(value as "asc" | "desc");
              setCursor(null);
              setServices([]);
            }}
          >
            <SelectTrigger className="md:w-[380px] w-full">
              <SelectValue placeholder="Sort by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest</SelectItem>
              <SelectItem value="asc">Oldest</SelectItem>
            </SelectContent>
          </Select>

          {/* Price sort (frontend only) */}
          <Select
            onValueChange={(value) =>
              setPriceSort(value as PriceSort)
            }
          >
            <SelectTrigger className="md:w-[380px] w-full">
              <SelectValue placeholder="Sort by price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lowToHigh">Low → High</SelectItem>
              <SelectItem value="highToLow">High → Low</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* ================= Service Cards ================= */}
        {
          displayedServices.length > 0 ? (
            <div className="grid md:grid-cols-4 gap-4">
          {displayedServices.map((service) => (
            <div
              key={service._id}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
          ) : (
            <p className="text-center text-2xl mt-32 text-gray-500">
              No services found!
            </p>
          )
        }

        {/* ================= Loading ================= */}
        {isFetching && (
          <p className="text-center mt-6 text-gray-500">
            Loading more services...
          </p>
        )}
      </div>
    </main>
  );
};

export default Services;
