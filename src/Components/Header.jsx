import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../Assets/Poeage Groups.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Companies", path: "/companies" },
    { label: "About Us", path: "/aboutus" },
    { label: "Careers", path: "/carriers" },
  ];

  // 🔥 SCROLL TO TOP (IMPORTANT)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  // 🔒 Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // 🔥 Header shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white border-gray-200 shadow-sm"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between">

            {/* LOGO */}
            <div
              onClick={() => {
                navigate("/");
                setOpen(false);
              }}
              className="flex items-center cursor-pointer group"
            >
              <img
                src={Logo}
                alt="Poeage Group"
                className="h-12 object-contain transition group-hover:scale-105"
              />
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                  >
                    {item.label}

                    {/* ACTIVE UNDERLINE */}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </button>
                );
              })}

              {/* CTA */}
              <button
                onClick={() => navigate("/contactus")}
                className="ml-4 px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow hover:shadow-lg hover:scale-105 transition"
              >
                Contact Us
              </button>
            </nav>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
            >
              ☰
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* BACKDROP */}
            <div
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setOpen(false)}
                className="self-end mb-8 text-gray-600 text-xl"
              >
                ✕
              </button>

              <nav className="flex flex-col gap-6">
                {navLinks.map((item, i) => (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => {
                      navigate(item.path);
                      setOpen(false);
                    }}
                    className={`text-left text-base font-medium ${
                      location.pathname === item.path
                        ? "text-blue-600"
                        : "text-gray-800"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}

                <button
                  onClick={() => {
                    navigate("/contactus");
                    setOpen(false);
                  }}
                  className="mt-6 h-11 rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500"
                >
                  Contact Us
                </button>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}