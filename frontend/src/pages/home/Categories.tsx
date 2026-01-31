// src/pages/home/Categories.tsx
import { ChevronRight, Cpu, HeartPulse, Home, Dumbbell, Camera, Car, Map, Layers } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { AuroraText } from "@/components/ui/AuroraText";

const categories = [
  {
    name: "Tech & IT",
    count: "3,120",
    path: "/technology",
    icon: Cpu,
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    name: "Health Services",
    count: "1,420",
    path: "/health",
    icon: HeartPulse,
    gradient: "from-rose-500 to-pink-500",
  },
  {
    name: "Lifestyle",
    count: "2,340",
    path: "/lifestyle",
    icon: Home,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Fitness Services",
    count: "1,890",
    path: "/fitness",
    icon: Dumbbell,
    gradient: "from-orange-500 to-amber-500",
  },
  {
    name: "House Services",
    count: "1,560",
    path: "/house",
    icon: Camera,
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    name: "Vehicle Services",
    count: "980",
    path: "/vehicle",
    icon: Car,
    gradient: "from-slate-600 to-slate-800",
  },
  {
    name: "Land Services",
    count: "2,100",
    path: "/land",
    icon: Map,
    gradient: "from-lime-500 to-green-500",
  },
  {
    name: "Other Services",
    count: "2,890",
    path: "/others",
    icon: Layers,
    gradient: "from-fuchsia-500 to-purple-500",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
};

const Categories = () => {
  const location = useLocation();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            <AuroraText>Explore Categories</AuroraText>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover trusted vendors across multiple professional services
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = location.pathname === category.path;

            return (
              <motion.div key={category.path} variants={item}>
                <Link
                  to={category.path}
                  className="group relative block p-6 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Gradient Glow */}
                  <div
                    className={`absolute inset-0 -z-10 rounded-2xl opacity-0 transition-all duration-500
                      bg-linear-to-br ${category.gradient} blur-2xl
                      group-hover:opacity-50
                      ${isActive ? "opacity-50" : ""}`}
                  />

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-linear-to-br ${category.gradient}
                      flex items-center justify-center mb-4 text-white
                      transition-all duration-300
                      group-hover:scale-110 group-hover:rotate-6
                      ${isActive ? "ring-4 ring-indigo-500/30" : ""}`}
                  >
                    <Icon className="w-7 h-7 drop-shadow-md" />
                  </div>

                  {/* Text */}
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {category.count} vendors
                  </p>

                  {/* Arrow */}
                  <ChevronRight
                    className={`absolute top-6 right-6 w-5 h-5 transition-all duration-300
                    ${isActive
                      ? "text-indigo-500 translate-x-1 opacity-100"
                      : "text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                    }`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
