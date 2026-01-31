import { NumberTicker } from "@/components/ui/NumberTicker";
import { Star, Check, Users, Globe } from "lucide-react";

const stats = [
  { label: "Active Vendors", value: 15000, suffix: "+", icon: Users },
  { label: "Services Completed", value: 2000000, suffix: "+", icon: Check },
  { label: "Customer Satisfaction", value: 98, suffix: "%", icon: Star },
  { label: "Countries Served", value: 45, suffix: "+", icon: Globe },
];


const Stats = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group cursor-pointer"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-indigo-100 to-violet-100 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-indigo-600" />
              </div>

              <div className="text-3xl font-bold text-slate-900 mb-1">
                <NumberTicker
                  value={stat.value}
                  delay={index * 0.1}
                />
                {stat.suffix}
              </div>

              <div className="text-sm text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
