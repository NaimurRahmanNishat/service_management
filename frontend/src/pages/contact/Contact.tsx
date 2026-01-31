import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const faqs = [
  { question: "How do I become a vendor?", answer: "Click 'Become a Vendor' and fill out your details. Our team will get back to you within 24 hours." },
  { question: "How can I track my service?", answer: "Log in to your account and check 'My Services' to see real-time updates." },
  { question: "What payment options are available?", answer: "We accept all major credit/debit cards, mobile banking, and online wallets." },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "Customer", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      
      {/* Hero Section */}
      <div className="text-center py-20 px-4 bg-linear-to-r from-indigo-500 to-violet-500 text-white rounded-b-3xl">
        <h1 className="text-5xl font-bold mb-4">We’re Here to Help</h1>
        <p className="text-lg max-w-2xl mx-auto">Reach out to Zenmo for support, queries, or vendor partnership.</p>
      </div>

      {/* Contact Form & Info */}
      <div className="container mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-800 dark:border-slate-700"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-800 dark:border-slate-700"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-800 dark:border-slate-700"
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-800 dark:border-slate-700"
            >
              <option>Customer</option>
              <option>Vendor</option>
              <option>Other</option>
            </select>
            <textarea
              placeholder="Your Message"
              value={form.message}
              required
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-slate-800 dark:border-slate-700"
              rows={5}
            />
            <button className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">Submit</button>
          </div>
          {submitted && <p className="mt-4 text-green-500 font-medium">Your message has been sent!</p>}
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-indigo-500" />
            <p>support@zenmo.com</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-indigo-500" />
            <p>+880 1234 567890</p>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="w-6 h-6 text-indigo-500" />
            <p>123 Zenmo Street, Dhaka, Bangladesh</p>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="w-6 h-6 text-indigo-500" />
            <p>Mon – Fri, 9AM – 6PM</p>
          </div>

          {/* FAQ Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">FAQ</h3>
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-slate-200 dark:border-slate-700 py-2">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left flex justify-between items-center font-medium"
                >
                  {faq.question}
                  <span>{openFaq === idx ? "-" : "+"}</span>
                </button>
                {openFaq === idx && <p className="mt-2 text-slate-600 dark:text-slate-400">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Footer */}
      <div className="bg-indigo-600 dark:bg-indigo-700 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
        <p className="text-indigo-100 mb-6">Reach out and our support team will help you.</p>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-800 transition">Contact Support</button>
      </div>
    </section>
  );
};

export default Contact;
