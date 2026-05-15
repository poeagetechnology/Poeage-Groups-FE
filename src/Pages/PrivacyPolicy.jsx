import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ChevronRight } from "lucide-react";

const sections = [
  {
    title: "Introduction",
    content:
      "Poeage Group of Companies is committed to protecting the privacy of individuals who interact with our platforms and services.",
  },
  {
    title: "Information We Collect",
    content:
      "We collect personal details like name, email, phone, and technical data such as IP address and usage patterns for analytics and security.",
  },
  {
    title: "How We Use Information",
    content:
      "Your data is used to provide services, respond to enquiries, improve systems, and comply with legal obligations.",
  },
  {
    title: "Cookies",
    content:
      "We use cookies to enhance experience and analyze traffic. You can disable cookies in browser settings.",
  },
  {
    title: "Data Security",
    content:
      "We implement safeguards to protect your data, though no system is completely secure.",
  },
  {
    title: "Information Sharing",
    content:
      "We do not sell data. Information may be shared internally within Poeage companies when necessary.",
  },
  {
    title: "Your Rights",
    content:
      "You may request access, correction, or deletion of your personal data as per applicable laws.",
  },
  {
    title: "Changes",
    content:
      "We may update this policy periodically. Continued use means acceptance of changes.",
  },
  {
    title: "Contact",
    content:
      "Reach out through official Poeage channels for any privacy-related concerns.",
  },
];

export default function PrivacyPolicy() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-white py-24 px-6 overflow-hidden">

      {/* background */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[300px] h-[300px] bg-blue-200/10 blur-[100px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[300px] h-[300px] bg-cyan-200/10 blur-[100px] rounded-full" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* SIDEBAR (DESKTOP ONLY) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-2">
            {sections.map((sec, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left px-4 py-3 rounded-lg transition text-sm flex items-center justify-between
                  ${
                    active === i
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
              >
                {sec.title}
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-2">

          {/* HEADER */}
          <div className="text-left mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <ShieldCheck className="text-blue-600" size={18} />
              </div>
              <p className="text-sm text-blue-600 font-medium">Legal</p>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Privacy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Policy
              </span>
            </h1>

            <p className="mt-4 text-gray-500 max-w-xl">
              Learn how we collect, use, and protect your personal information.
            </p>
          </div>

          {/* DESKTOP VIEW (UNCHANGED) */}
          <div className="hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 backdrop-blur rounded-2xl border border-gray-100 shadow-sm p-8"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {sections[active].title}
                </h2>

                <p className="text-gray-600 leading-relaxed">
                  {sections[active].content}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* MOBILE VIEW (ALL SECTIONS) */}
          <div className="lg:hidden space-y-6">
            {sections.map((sec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/90 backdrop-blur rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {sec.title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {sec.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-7 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold mb-1">
                Questions about your privacy?
              </h3>
              <p className="text-sm opacity-90 mb-3">
                Our team is here to help you anytime.
              </p>
              <button className="bg-white text-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
                Contact Support
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}