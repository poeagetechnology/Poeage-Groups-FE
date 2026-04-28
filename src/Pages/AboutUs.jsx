import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import WebApp from "../Assets/web app.webp";
import MobileApp from "../Assets/mobile app.webp";
import AIImage from "../Assets/Ai.jpeg";
import SoftwareImage from "../Assets/Software-Development.jpg";
// import FounderImg from "../Assets/Founder.jpeg";

// 🔢 Counter Hook
function useCountUp(target, start = 0, duration = 1500) {
  const [count, setCount] = useState(start);
  useEffect(() => {
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (target - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, start, duration]);
  return count;
}

export default function AboutUs() {
  const timelineRef = useRef(null);

  const projects = useCountUp(120);
  const clients = useCountUp(80);
  const years = useCountUp(3);

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-28">

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-blue-600 text-sm font-medium mb-2">About Us</p>
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900">
            Building the Future with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              {" "}Innovation
            </span>
          </h1>
          <p className="mt-5 text-gray-500">
            We create scalable digital solutions that empower businesses.
          </p>
        </div>

        {/* 🔢 COUNTERS */}
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold text-blue-600">{projects}+</h3>
            <p className="text-gray-500 text-sm">Projects</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">{clients}+</h3>
            <p className="text-gray-500 text-sm">Clients</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">{years}+</h3>
            <p className="text-gray-500 text-sm">Years</p>
          </div>
        </div>

        {/* SERVICES */}
        <div className="grid md:grid-cols-2 gap-10">
          {[{ img: WebApp, title: "Web Apps" }, { img: MobileApp, title: "Mobile Apps" }].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-600 to-cyan-500 p-8 rounded-3xl text-white shadow-xl"
            >
              <img src={item.img} alt={item.title} className="h-14 mb-4" />
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* 🧭 TIMELINE */}
        <div ref={timelineRef} className="relative">
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gray-200" />

          {[{
            year: "2023",
            text: "Started with Web & Mobile",
            img: WebApp
          }, {
            year: "2024",
            text: "Expanded into AI",
            img: AIImage
          }, {
            year: "2025",
            text: "Launched Products",
            img: SoftwareImage
          }].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`grid md:grid-cols-2 gap-10 items-center mb-16 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
            >
              <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-blue-600 rounded-full" />
                <img src={item.img} alt={item.text} className="rounded-2xl shadow-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.year}
                </h3>
                <p className="text-gray-600 mt-2">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🧠 HOVER STORY */}
        <div className="grid md:grid-cols-3 gap-6">
          {["Innovation", "Scalability", "Growth"].map((t, i) => (
            <div key={i} className="group p-6 border rounded-2xl hover:bg-blue-600 transition">
              <h3 className="text-lg font-semibold group-hover:text-white">{t}</h3>
              <p className="text-sm text-gray-500 group-hover:text-white mt-2">
                We focus on {t.toLowerCase()} driven solutions.
              </p>
            </div>
          ))}
        </div>

        {/* 👤 FOUNDER QUOTE */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-10 rounded-3xl flex items-center">
  <div>
    <p className="italic text-lg mb-4">
      “Technology should empower people and transform businesses.”
    </p>
    <h3 className="text-2xl font-semibold">Mr. Gowrishankar</h3>
    <p className="text-sm opacity-80">Founder & Visionary</p>
  </div>
</div>

      </div>
    </section>
  );
}