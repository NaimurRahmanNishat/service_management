// src/pages/home/Home.tsx
import { useEffect, useState } from "react";
import Loading from "@/components/shared/Loading";
import { useGetAllHomeDataQuery } from "@/redux/features/home/homeApi";
import type { IHome } from "@/types/homeType";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const { data, isLoading } = useGetAllHomeDataQuery();
  const homes: IHome[] = data?.data?.data || [];
  const home = homes[0];
  
    // AUTO SLIDE
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (!home?.heroSection?.images?.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === home.heroSection.images.length - 1 ? 0 : prev + 1
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, [home]);

  if (isLoading) {
    return <Loading />;
  }

  if (!home) {
    return <div className="text-center py-20">No data found</div>;
  }

  return (
    <div className="min-h-screen">
      {/* ================= HERO SECTION (SLIDER) ================= */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        {home.heroSection.images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt="Hero Slide"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out
              ${index === currentSlide ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Slider Text */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold max-w-3xl">
            {home.headerSliderTexts[currentSlide % home.headerSliderTexts.length]}
          </h1>
        </div>
      </section>

      {/* ================= PRICING SECTION ================= */}
      <section className="mt-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Pricing Plans
        </h2>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(home.pricingSection).map(([key, plan]) => (
            <div
              key={key}
              className="border rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {plan.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {plan.description}
              </p>

              <p className="text-3xl font-bold mb-4">
                {plan.price}
              </p>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    ✅ {feature}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2 mb-4">
                {plan.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={plan.title}
                    loading="lazy"
                    className="h-32 w-32 object-cover rounded"
                  />
                ))}
              </div>

              <Link to="/services">
              <button className="w-full bg-black text-white py-2 rounded-lg cursor-pointer">Choose Plan</button>
              </Link>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
