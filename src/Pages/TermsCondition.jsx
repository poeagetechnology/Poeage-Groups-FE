import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ChevronRight } from "lucide-react";

const sections = [
  {
    title: "Introduction",
    content:
      "These Terms and Conditions govern the use of the Poeage Group of Companies website and services. By accessing or using this website, you agree to comply with these terms.",
  },
  {
    title: "Use of Website",
    content:
      "The content provided on this website is for general informational purposes only. Unauthorized use, reproduction, or distribution of any content is strictly prohibited.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content, logos, designs, text, graphics, and trademarks displayed are the intellectual property of Poeage Group unless stated otherwise.",
  },
  {
    title: "Limitation of Liability",
    content:
      "Poeage Group shall not be held liable for any damages arising from the use or inability to use this website or its services.",
  },
  {
    title: "Third-Party Links",
    content:
      "This website may contain links to external websites. Poeage Group is not responsible for their content or privacy practices.",
  },
  {
    title: "Modifications",
    content:
      "Poeage Group reserves the right to modify these Terms and Conditions at any time without prior notice.",
  },
];

export default function TermsCondition() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-white py-24 px-6 overflow-hidden">

      {/* Background */}
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
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <ShieldCheck className="text-blue-600" size={18} />
              </div>
              <p className="text-sm text-blue-600 font-medium">Legal</p>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Terms{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                & Conditions
              </span>
            </h1>

            <p className="mt-4 text-gray-500">
              Last updated: April 2026
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

          {/* MOBILE VIEW (ALL SECTIONS SHOWN) */}
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
                Need help understanding these terms?
              </h3>
              <p className="text-sm opacity-90 mb-3">
                Our team is here to assist you anytime.
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