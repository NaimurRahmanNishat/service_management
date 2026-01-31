import { motion } from "framer-motion";
import { NumberTicker } from "@/components/ui/NumberTicker"; 
import { Users, Check, Star, Globe } from "lucide-react";

const stats = [
  { label: "Active Vendors", value: 15000, icon: Users },
  { label: "Services Completed", value: 2000000, icon: Check },
  { label: "Customer Satisfaction", value: 98, icon: Star },
  { label: "Countries Served", value: 45, icon: Globe },
];

const steps = [
  { title: "Vendors List Products", description: "Vendors upload products available for services.", icon: "📦" },
  { title: "Customers Browse", description: "Customers browse products and select services.", icon: "🔍" },
  { title: "Book & Pay", description: "Seamless booking and payment process.", icon: "💳" },
  { title: "Service Delivered", description: "Vendors deliver services at your convenience.", icon: "🚚" },
];

const About = () => {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Hero */}
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">About Zenmo</h1>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Zenmo connects vendors with customers through product-based services. Discover, book, and enjoy seamless experiences.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">Explore Services</button>
          <button className="bg-white dark:bg-slate-800 text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-900 transition">Become a Vendor</button>
        </div>
      </div>

      {/* How it Works */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How Zenmo Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow hover:shadow-lg text-center"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow"
            >
              <stat.icon className="w-10 h-10 mx-auto mb-2 text-indigo-600"/>
              <div className="text-3xl font-bold">
                <NumberTicker value={stat.value} />
                {stat.label === "Customer Satisfaction" ? "%" : "+"}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-indigo-600 dark:bg-indigo-700 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
        <p className="text-indigo-100 mb-8">Join Zenmo today and connect with top vendors.</p>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition">Explore Services</button>
      </div>
    </section>
  )
}

export default About;
