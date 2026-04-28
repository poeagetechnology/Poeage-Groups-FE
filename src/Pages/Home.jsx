import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import {
  Users,
  Briefcase,
  Building2,
  Factory,
  Star,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  const ref = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#f8fafc] text-slate-900 overflow-hidden">

      {/* 🔥 HERO */}
      <section className="relative min-h-[95vh] flex items-center px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">

        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-2xl lg:text-3xl font-extrabold text-white leading-tight"
            >
              <h1 className="text-2xl lg:text-3xl">Poeage Groups</h1>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-inter text-2xl lg:text-3xl">
                Building the Future Across Industries
              </span>
            </motion.h1>

            <p className="mt-6 max-w-2xl mx-auto text-slate-200 text-lg">
              Multi-industry innovation across technology, infrastructure,
              consulting, and enterprise services.
            </p>

            
             
          </div>

          {/* 🔥 MAGNETIC LOGO (UPDATED) */}
          <div className="flex justify-center">
            <motion.div
              onClick={() => navigate("/companies")}
              animate={{ y: [0, -15, 0] }} // 🌊 floating
              transition={{ duration: 4, repeat: Infinity }}
              className="relative cursor-pointer"
            >
              {/* ROTATION */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <div
                  ref={ref}
                  onMouseMove={(e) => {
                    const rect = ref.current.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    ref.current.style.transform = `
                      translate(${x * 0.2}px, ${y * 0.2}px)
                      scale(1.08)
                    `;
                  }}
                  onMouseLeave={() => {
                    ref.current.style.transform =
                      "translate(0px, 0px) scale(1)";
                  }}
                  className="relative w-40 h-40 lg:w-52 lg:h-52 rounded-2xl 
                  bg-gradient-to-br from-blue-600 to-cyan-400 
                  shadow-2xl flex items-center justify-center 
                  transition-transform duration-200"
                >
                  {/* 🔥 LOGO */}
                  <span className="text-white text-3xl font-bold">P</span>

                  {/* ✨ GLOW */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-cyan-400"
                    animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ filter: "blur(30px)" }}
                  />

                  {/* INNER */}
                  <div className="absolute inset-4 bg-white/10 backdrop-blur rounded-xl" />
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 🏢 COMPANIES */}
      <section className="py-24 bg-white text-center">
        <h2 className="text-2xl lg:text-3xl font-bold mb-12">Our Companies</h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
          {[
            "Poeage Technologies",
            "Poeage Builders",
            "Poeage Web Services",
            "Poeage IT Solutions",
          ].map((c) => (
            <div key={c} className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition">
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* 📊 STATS */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["10+", "Industries"],
            ["1000+", "Professionals"],
            ["3+", "Years Experience"],
            ["10M+", "Project Value"],
          ].map(([value, label]) => (
            <div className="p-8 bg-white rounded-2xl shadow-sm">
              <h3 className="text-2xl lg:text-3xl font-bold text-blue-600">{value}</h3>
              <p className="text-slate-600 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ⚡ BUSINESSES */}
      <section className="py-28 bg-white text-center">
        <h2 className="text-2xl lg:text-3xl font-bold mb-12">Our Businesses</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
          {[
            ["Technology & Software", Users],
            ["Infrastructure & Construction", Building2],
            ["Consulting & Recruitment", Briefcase],
            ["Cloud & IT Services", Factory],
            ["Training & Development", CheckCircle],
            ["Enterprise Solutions", Star],
          ].map(([title, Icon]) => (
            <div className="p-8 border rounded-2xl shadow-sm hover:shadow-xl transition text-left">
              <Icon className="mb-4 text-blue-600" size={28} />
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-slate-600 mt-2">
                Delivering scalable, innovative, and enterprise-grade solutions.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 🧭 PROCESS */}
      <section className="py-28 bg-slate-50 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold mb-12">
          How We Build & Scale Businesses
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {["Strategy", "Execution", "Scale"].map((step, i) => (
            <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition">
              <p className="text-blue-600 font-bold mb-2">0{i + 1}</p>
              <h3 className="font-semibold text-lg">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 💬 TESTIMONIAL */}
      <section className="py-28 bg-white text-center">
        <h2 className="text-2xl lg:text-3xl font-bold mb-10">
          What Our Clients Say
        </h2>

        <div className="max-w-3xl mx-auto p-10 border rounded-2xl shadow-lg">
          <p className="text-xl text-slate-700 italic">
            Poeage Group transformed our operations across multiple
            business units with scalable and reliable solutions.
          </p>

          <div className="mt-6">
            <p className="font-semibold">Head of Operations</p>
            <p className="text-sm text-slate-500">
              Enterprise Client
            </p>
          </div>
        </div>
      </section>

      {/* 🎯 CTA */}
      <section className="py-28 bg-gradient-to-r from-blue-700 to-cyan-600 text-white text-center">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6">
          Let’s Build Something Bigger Together
        </h1>

        <p className="max-w-xl text-xl mx-auto text-blue-100 mb-10">
          Partner with Poeage Group to create scalable and future-ready businesses.
        </p>

        <Link
          to="/contactus"
          className="bg-white text-blue-700 px-10 py-4 rounded-full font-semibold shadow-xl hover:scale-105 transition"
        >
          Get Started
        </Link>
      </section>

    </div>
  );
}