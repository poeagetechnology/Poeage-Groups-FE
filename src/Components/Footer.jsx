import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Mail, Phone, ArrowRight } from "lucide-react";
import Logo from "../Assets/Poeage Groups.png";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-white border-t border-gray-100 overflow-hidden">

      {/* subtle glow */}
      <div className="pointer-events-none absolute -top-20 left-0 w-[300px] h-[300px] bg-blue-200/10 blur-[100px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-20 right-0 w-[300px] h-[300px] bg-cyan-200/10 blur-[100px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        {/* 🔥 GRID */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

          {/* BRAND */}
          <div>
            <div
              className="flex items-center gap-3 mb-5 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-30 h-20 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm overflow-hidden">
                <img
                  src={Logo}
                  alt="Poeage Logo"
                  className="w-full h-full"
                  
                />
              </div>

              
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              Building scalable businesses across technology, infrastructure, and enterprise services.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-6">
              {[FaInstagram, FaFacebookF, FaLinkedinIn].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer"
                >
                  <Icon size={15} />
                </div>
              ))}
            </div>
          </div>

          {/* COMPANIES */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-5">Companies</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "Poeage Technologies",
                "Poeage Builders",
                "Poeage Nexus",
                "Poeage Web Services",
                "Poeage IT Solutions",
              ].map((c) => (
                <li
                  key={c}
                  className="flex items-center justify-between group cursor-pointer hover:text-blue-600 transition"
                >
                  {c}
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                </li>
              ))}
            </ul>
          </div>

          {/* NAV */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-5">Navigation</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                { name: "Home", path: "/" },
                { name: "Companies", path: "/companies" },
                { name: "About", path: "/aboutus" },
                { name: "Careers", path: "/carriers" },
              ].map((item) => (
                <li
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="flex items-center justify-between group cursor-pointer hover:text-blue-600 transition"
                >
                  {item.name}
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-5">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                { name: "FAQ", path: "/faq" },
                { name: "Terms & Conditions", path: "/termsandconditions" },
                { name: "Privacy Policy", path: "/privacypolicy" },
              ].map((item) => (
                <li
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="flex items-center justify-between group cursor-pointer hover:text-blue-600 transition"
                >
                  {item.name}
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-5">Contact</h4>

            <ul className="space-y-4 text-sm text-gray-600">
              <li
                onClick={() => navigate("/contactus")}
                className="cursor-pointer hover:text-blue-600 transition"
              >
                Contact Us
              </li>

              <li className="flex items-center gap-2 text-gray-500">
                <Mail size={14} /> info@poeage.com
              </li>

              <li className="flex items-center gap-2 text-gray-500">
                <Phone size={14} /> +91 80568 89616
              </li>
            </ul>
          </div>

        </div>

        {/* CTA STRIP */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-semibold">Stay connected with Poeage</h3>
              <p className="text-sm opacity-90">Get updates on our latest innovations.</p>
            </div>

            {/* EMAIL SUBSCRIBE */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const email = form.email.value;
                if (!email) return;
                // 🔗 hook your API here
                console.log("Subscribe:", email);
                form.reset();
              }}
              className="w-full md:w-auto flex flex-col sm:flex-row gap-2"
            >
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full sm:w-64 px-4 py-2 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Poeage Group. All rights reserved.</p>

          <div className="flex gap-6">
            <span
              onClick={() => navigate("/privacypolicy")}
              className="cursor-pointer hover:text-blue-600"
            >
              Privacy
            </span>
            <span
              onClick={() => navigate("/termsandconditions")}
              className="cursor-pointer hover:text-blue-600"
            >
              Terms
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
