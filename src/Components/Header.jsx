import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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
    { label: "Products", path: "/product" }
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-lg ${
          scrolled
            ? "bg-white/70 shadow-lg border-b border-gray-200"
            : "bg-transparent"
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
                className="h-12 object-contain transition duration-300 group-hover:scale-110"
              />
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="relative text-sm font-semibold tracking-wide text-gray-700 transition"
                  >
                    <span
                      className={`transition ${
                        isActive
                          ? "text-blue-600"
                          : "hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Animated underline */}
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 h-[2px] bg-blue-600"
                      style={{
                        width: isActive ? "100%" : "0%",
                      }}
                    />
                  </button>
                );
              })}

              {/* CTA */}
              <button
                onClick={() => navigate("/contactus")}
                className="ml-4 px-6 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
              >
                Contact
              </button>
            </nav>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
            >
              <Menu size={22} />
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
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
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
                className="self-end mb-8 text-gray-600"
              >
                <X size={24} />
              </button>

              <nav className="flex flex-col gap-6">
                {navLinks.map((item, i) => (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => {
                      navigate(item.path);
                      setOpen(false);
                    }}
                    className={`text-left text-lg font-medium transition ${
                      location.pathname === item.path
                        ? "text-blue-600"
                        : "text-gray-800 hover:text-blue-600"
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
                  className="mt-8 h-12 rounded-xl text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md"
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
