import { Shield, Award, Clock, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Verified Vendors",
    description:
      "All service providers undergo thorough background checks and verification processes.",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description:
      "Every service is backed by our satisfaction guarantee and dispute resolution.",
  },
  {
    icon: Clock,
    title: "Instant Booking",
    description:
      "Book services in seconds with real-time availability and instant confirmations.",
  },
  {
    icon: TrendingUp,
    title: "Best Prices",
    description:
      "Competitive pricing with transparent costs and no hidden fees.",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Why Choose Zenmo?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We've built a platform that prioritizes trust, quality, and
            convenience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group text-center p-8 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-indigo-100 to-violet-100 rounded-2xl mb-5 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
