import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nexsus from "../Assets/Nexsus.jpg";
import Technology from "../Assets/Technology.png";
import Builders from "../Assets/Builders.png";
import IT from "../Assets/IT.png";
import Marketting from "../Assets/Digital.png";
import Web from "../Assets/Web.png";
import Hub from "../Assets/Hub.png";

const categories = [
  "All",
  "Technology",
  "Construction",
  "Consulting",
  "Cloud",
  "IT Services",
  "Marketing",
  "Shopping",
  "CRM",
];

const companies = [
  {
    name: "Poeage Technologies",
    category: "Technology",
    desc: "Advanced software and digital solutions.",
    logo: Technology,
  },
  {
    name: "Poeage CRM",
    category: "CRM",
    desc: "Customer relationship management solutions.",
    logo: Technology,
  },
  {
    name: "Poeage Builders",
    category: "Construction",
    desc: "Infrastructure and engineering excellence.",
    logo: Builders,
  },
  {
    name: "Poeage Nexus",
    category: "Consulting",
    desc: "Career growth and consulting services.",
    logo: Nexsus,
  },
  {
    name: "Poeage Web Services",
    category: "Cloud",
    desc: "Cloud infrastructure & hosting solutions.",
    logo: Web,
  },
  {
    name: "Poeage IT Solutions",
    category: "IT Services",
    desc: "Enterprise IT support and services.",
    logo: IT,
  },
  {
    name: "Poeage Digital Marketing",
    category: "Marketing",
    desc: "SEO, Ads, and digital growth strategies.",
    logo: Marketting,
  },
  {
    name: "Poeage Hub",
    category: "Shopping",
    desc: "Next-gen eCommerce and shopping platform.",
    logo: Hub,
  },
];

export default function UltraCompanies() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? companies
      : companies.filter((c) => c.category === active);

  return (
    <section className="relative py-28 bg-white overflow-hidden">

      {/* 🌈 BACKGROUND EFFECT (UNCHANGED) */}
      <div className="absolute -top-40 left-0 w-[500px] h-[500px] bg-blue-300/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-300/20 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* 🔥 TITLE (ENHANCED TYPOGRAPHY ONLY) */}
        <div className="text-center mb-20">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>

          <p className="mt-5 text-gray-500 max-w-xl mx-auto leading-relaxed">
            A powerful network of companies building innovation across industries.
          </p>
        </div>

        {/* 🧭 CATEGORY BAR (SMOOTHER INTERACTION) */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  active === cat
                    ? "text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md scale-105"
                    : "text-gray-700 bg-white border border-gray-200 hover:shadow-sm hover:-translate-y-[1px]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 💎 COMPANY GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filtered.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -10 }}
                className="group relative p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* 🌈 HOVER LIGHT (SMOOTHER) */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition duration-300" />

                {/* LOGO */}
                <img
                  src={c.logo}
                  alt={c.name}
                  className="h-12 mb-6 object-contain transition-transform duration-300 group-hover:scale-105"
                />

                {/* NAME */}
                <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                  {c.name}
                </h3>

                {/* DESC */}
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {c.desc}
                </p>

                {/* CTA */}
                <span className="inline-block mt-6 text-sm font-medium text-blue-600 group-hover:text-cyan-500 transition">
                  Explore →
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}