import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import Nexsus from "../Assets/Nexsus.jpg";
import Technology from "../Assets/Technology.png";
import Builders from "../Assets/Builders.png";
import IT from "../Assets/IT.png";
import Web from "../Assets/Web.png";
import Hub from "../Assets/Hub.png";

export default function PoeageEcosystem() {
  const rotate = useMotionValue(0);
  const smoothRotate = useTransform(rotate, (r) => r % 360);

  const companies = [
    { label: "Poeage Technology", img: Technology, products: ["AI Platform", "SaaS Tools", "Automation"] },
    { label: "Poeage Builders", img: Builders, products: ["Construction", "Real Estate"] },
    { label: "Poeage Nexus", img: Nexsus, products: ["API Hub", "Integration"] },
    { label: "Poeage Hub", img: Hub, products: ["E-commerce", "Marketplace"] },
    { label: "Poeage Web Services", img: Web, products: ["Hosting", "Cloud"] },
    { label: "Poeage IT Solution", img: IT, products: ["ERP", "CRM"] },
  ];

  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">

      {/* MOBILE = STACK / DESKTOP = GRID */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* LEFT SIDE */}
        <div className="space-y-8 sm:space-y-12">

          <div>
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">
              Poeage Group
            </h1>
            <p className="mt-4 text-gray-500 text-sm sm:text-base max-w-lg">
              A corporate ecosystem focused on <b>Product Development</b> and scalable <b>Company Solutions</b>.
            </p>
          </div>

          {/* FOUNDER */}
          <div className="border-l-4 border-blue-600 pl-4 sm:pl-6">
            <p className="text-gray-600 italic text-sm sm:text-base">
              “Building a powerful ecosystem where every innovation connects.”
            </p>
            <h3 className="mt-3 font-semibold text-gray-900">
              Mr. Gowrishankar Gunasekaran
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">Founder</p>
          </div>

          {/* COMPANY LIST */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {companies.map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border bg-gray-50">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center p-1">
                  <img src={c.img} alt={c.label} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs sm:text-sm font-medium">{c.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT SIDE */}

        {/* DESKTOP ORBIT */}
        <div className="hidden md:flex justify-center items-center relative h-[500px]">

          <div className="absolute z-20 bg-white shadow border px-6 py-3 rounded-full text-sm font-semibold">
            Poeage
          </div>

          <motion.div
            drag
            onDrag={(e, info) => rotate.set(rotate.get() + info.offset.x * 0.2)}
            style={{ rotate: smoothRotate }}
            className="relative w-[380px] h-[380px]"
          >

            {/* LINES */}
            <svg className="absolute inset-0 w-full h-full">
              {companies.map((_, i) => {
                const angle = (i / companies.length) * 2 * Math.PI;
                const x = 190 + 140 * Math.cos(angle);
                const y = 190 + 140 * Math.sin(angle);
                return <line key={i} x1="190" y1="190" x2={x} y2={y} stroke="#e5e7eb" />;
              })}
            </svg>

            {/* NODES */}
            {companies.map((c, i) => {
              const angle = (i / companies.length) * 2 * Math.PI;
              const x = 190 + 140 * Math.cos(angle);
              const y = 190 + 140 * Math.sin(angle);

              return (
                <motion.div key={i} style={{ left: x, top: y }} className="absolute -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: -smoothRotate }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-10 h-10 bg-white rounded-full shadow border flex items-center justify-center p-1">
                      <img src={c.img} alt={c.label} />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* MOBILE VIEW (REPLACED ORBIT) */}
        <div className="md:hidden space-y-3 mt-6">

          <div className="bg-blue-600 text-white text-center py-3 rounded-xl">
            Poeage Ecosystem
          </div>

          {companies.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 border rounded-xl bg-gray-50"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <img src={c.img} alt={c.label} />
              </div>
              <span className="text-sm">{c.label}</span>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}