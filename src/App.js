import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Analytics } from "@vercel/analytics/react"
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// 🔥 Lazy imports
const Home = lazy(() => import("./Pages/Home"));
const AboutUs = lazy(() => import("./Pages/AboutUs"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const Companies = lazy(() => import("./Pages/Companies"));
const TermsCondition = lazy(() => import("./Pages/TermsCondition"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const FAQ = lazy(() => import("./Pages/FAQ"));
const Carriers = lazy(() => import("./Pages/Carriers"));

export default function App() {
  return (
    <>
      <Header />

      <Suspense
        fallback={
         <div className="h-screen flex items-center justify-center bg-white">
  <div className="relative">
    <div className="w-12 h-12 rounded-full border-4 border-transparent 
      border-t-blue-600 border-r-cyan-400 animate-spin"></div>

    {/* glow */}
    <div className="absolute inset-0 rounded-full blur-md bg-cyan-400 opacity-30"></div>
  </div>
</div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsandconditions" element={<TermsCondition />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/carriers" element={<Carriers />} />
        </Routes>
      </Suspense>

      <Footer />
    <Analytics />

    </>
  );
}