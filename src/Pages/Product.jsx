import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    title: "CRM System",
    category: "Business",
    icon: "👥",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    desc: "Manage customers & sales pipeline.",
    details: [
      "🗂 Centralized customer database with full contact history",
      "📊 Visual sales pipeline with drag-and-drop deal stages",
      "📧 Automated email follow-ups and drip campaigns",
      "📅 Meeting & task scheduler with calendar sync",
      "📈 Revenue forecasting and sales analytics dashboard",
      "🔔 Real-time lead notifications and activity alerts",
      "🔗 Integrates with WhatsApp, Gmail, and Outlook",
      "📱 Mobile-friendly app for sales teams on the go",
    ],
  },
  {
    title: "ERP Platform",
    category: "Enterprise",
    icon: "🏢",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    desc: "Full business automation system.",
    details: [
      "⚙️ End-to-end business process automation",
      "💰 Finance, accounting & budgeting modules",
      "📦 Supply chain and procurement management",
      "👥 HR, payroll and attendance integration",
      "📊 Real-time business intelligence dashboards",
      "🔐 Role-based access control for all departments",
      "🌐 Multi-branch and multi-currency support",
      "📋 Audit trails and compliance reporting",
    ],
  },
  {
    title: "Bus Booking",
    category: "Transport",
    icon: "🚌",
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
    desc: "Online ticket booking system.",
    details: [
      "🗺 Route & schedule management for operators",
      "💺 Interactive seat selection interface",
      "💳 Secure online payment gateway integration",
      "🎫 E-ticket generation with QR code scanning",
      "🔔 SMS & email booking confirmation alerts",
      "📊 Passenger manifest and occupancy reports",
      "♻️ Easy cancellation and refund workflow",
      "📱 Mobile-first booking experience",
    ],
  },
  {
    title: "Food Delivery",
    category: "Service",
    icon: "🍔",
    img: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&q=80",
    desc: "Restaurant ordering platform.",
    details: [
      "🍽 Multi-restaurant menu management",
      "📍 Real-time order tracking on live map",
      "🛵 Delivery partner assignment & routing",
      "⭐ Customer ratings and review system",
      "🎁 Discount coupons and loyalty rewards",
      "💳 Multiple payment options including COD",
      "📊 Restaurant sales and order analytics",
      "🔔 Push notifications for order status updates",
    ],
  },
  {
    title: "Second Car Consultancy",
    category: "Service",
    icon: "🚗",
    img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
    desc: "Used car marketplace.",
    details: [
      "🔍 Advanced car search with filters (brand, year, price)",
      "📸 360° photo gallery for each listing",
      "🧾 Vehicle inspection and condition reports",
      "💬 In-app buyer-seller chat system",
      "💰 EMI calculator and finance options",
      "📜 RC transfer & documentation assistance",
      "🔖 Price comparison with market value estimates",
      "⭐ Verified seller badges and trust ratings",
    ],
  },
  {
    title: "E-Learning",
    category: "Education",
    icon: "🎓",
    img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80",
    desc: "Online course platform.",
    details: [
      "🎥 HD video lectures with playback speed control",
      "📝 Interactive quizzes and assignments",
      "🏆 Certificate generation on course completion",
      "👨‍🏫 Instructor dashboard with student analytics",
      "💬 Live doubt-clearing sessions and Q&A forums",
      "📱 Offline content download for mobile learning",
      "📊 Learner progress tracking and reports",
      "🌐 Multi-language course support",
    ],
  },
  {
    title: "Tracking System",
    category: "Logistics",
    icon: "📍",
    img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80",
    desc: "Real-time parcel & asset tracking.",
    details: [
      "🗺 Live GPS tracking on interactive map",
      "📦 Barcode & QR code scanning at checkpoints",
      "🔔 Automated delivery status notifications",
      "⏱ ETA prediction using route intelligence",
      "📊 Full shipment history and audit trail",
      "🚨 Tamper and delay alerts for critical items",
      "🔗 API integration with courier partners",
      "📱 Customer self-tracking portal",
    ],
  },
  {
    title: "Poeage Hub",
    category: "Core",
    icon: "🌐",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    desc: "All-in-one digital ecosystem.",
    details: [
      "🔗 Unified platform connecting all Poeage products",
      "🔐 Single sign-on across all modules",
      "📊 Consolidated analytics and reporting",
      "🛠 Plugin marketplace for custom extensions",
      "🤝 Third-party API integrations hub",
      "📋 Centralized notification and alert center",
      "👤 User and role management across modules",
      "🌍 Multi-tenant architecture for enterprises",
    ],
  },
  {
    title: "Inventory",
    category: "Management",
    icon: "📦",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    desc: "Stock & warehouse control.",
    details: [
      "📦 Real-time stock level monitoring",
      "⚠️ Low-stock alerts and auto-reorder triggers",
      "🏷 Barcode and SKU management",
      "🔄 Multi-warehouse transfer management",
      "📊 Inventory valuation reports (FIFO/LIFO)",
      "🔍 Batch and expiry date tracking",
      "📋 Purchase order and supplier management",
      "📱 Mobile stocktaking via scanner",
    ],
  },
  {
    title: "HR Management",
    category: "Enterprise",
    icon: "🪪",
    img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
    desc: "Employee & payroll system.",
    details: [
      "👤 Employee onboarding and profile management",
      "⏱ Attendance and leave management",
      "💰 Automated payroll with tax computation",
      "📋 Performance appraisal and goal tracking",
      "📄 Offer letter and document generation",
      "🏥 Benefits and insurance management",
      "📊 Headcount and attrition analytics",
      "📱 Employee self-service mobile app",
    ],
  },
  {
    title: "Billing Software",
    category: "Business",
    icon: "🧾",
    img: "https://images.unsplash.com/photo-1568234928966-359c35dd8327?w=600&q=80",
    desc: "Invoice & billing system.",
    details: [
      "🧾 Professional GST-compliant invoice generation",
      "💳 Online payment link in invoices",
      "🔄 Recurring billing and subscription management",
      "📊 Revenue and payment tracking dashboard",
      "⏰ Overdue invoice reminders via email/SMS",
      "📁 Client-wise billing history",
      "🌍 Multi-currency and tax rate support",
      "📥 One-click expense recording",
    ],
  },
  {
    title: "Fleet System",
    category: "Logistics",
    icon: "🚛",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80",
    desc: "Fleet tracking & management.",
    details: [
      "🗺 Live vehicle location tracking",
      "⛽ Fuel consumption monitoring",
      "🔧 Preventive maintenance scheduling",
      "👨‍✈️ Driver behavior and safety scoring",
      "📋 Trip logs and distance reports",
      "🚨 Overspeed and geofence breach alerts",
      "📊 Fleet utilization and cost analytics",
      "📄 Document expiry reminders (RC, insurance)",
    ],
  },
  {
    title: "Hotel Booking",
    category: "Service",
    icon: "🏨",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    desc: "Room reservation system.",
    details: [
      "🏨 Room type and availability calendar",
      "💳 Secure online booking and payment",
      "📧 Auto confirmation emails and e-receipts",
      "🛎 Housekeeping and room service management",
      "⭐ Guest feedback and review collection",
      "🔄 Easy modification and cancellation",
      "📊 Occupancy and revenue analytics",
      "🌐 Channel manager for OTA sync (MakeMyTrip, Booking.com)",
    ],
  },
  {
    title: "Taxi App",
    category: "Transport",
    icon: "🚕",
    img: "https://images.unsplash.com/photo-1562447457-579fc34967fb?w=600&q=80",
    desc: "Ride booking platform.",
    details: [
      "📍 Real-time ride booking with live map",
      "🔄 Auto driver matching algorithm",
      "💰 Dynamic pricing and fare estimation",
      "⭐ Rider and driver rating system",
      "🔔 Live ride status notifications",
      "💳 Multiple payment modes including wallet",
      "🛡 SOS safety button for passengers",
      "📊 Driver earnings and trip analytics",
    ],
  },
  {
    title: "Courier Tracking",
    category: "Logistics",
    icon: "📫",
    img: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=600&q=80",
    desc: "Parcel delivery tracking.",
    details: [
      "📦 End-to-end shipment lifecycle tracking",
      "🔔 SMS/WhatsApp delivery notifications",
      "📍 Last-mile delivery agent tracking",
      "🖨 Label and manifest generation",
      "📊 Delivery success rate analytics",
      "⏱ SLA breach monitoring and alerts",
      "🔗 Multi-carrier integration support",
      "📋 Proof of delivery with signature capture",
    ],
  },
  {
    title: "POS System",
    category: "Business",
    icon: "🖥",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    desc: "Retail point-of-sale billing.",
    details: [
      "🛒 Fast billing with barcode scanner support",
      "💳 Cash, card, UPI and split payment modes",
      "🧾 GST invoice and thermal receipt printing",
      "📊 Daily sales summary and shift reports",
      "📦 Auto inventory deduction on each sale",
      "🎁 Loyalty points and discount schemes",
      "👤 Customer purchase history",
      "☁️ Cloud sync for multi-outlet management",
    ],
  },
  {
    title: "Hospital Management",
    category: "Enterprise",
    icon: "🏥",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    desc: "Complete hospital ERP.",
    details: [
      "🗓 OPD appointment and queue management",
      "🛏 IPD admission, ward and bed management",
      "💊 Pharmacy inventory and dispensing",
      "🧪 Lab test orders and result delivery",
      "🧾 Patient billing and insurance claim processing",
      "📋 Electronic medical records (EMR)",
      "👨‍⚕️ Doctor schedule and consultation tracking",
      "📊 Hospital KPI and revenue dashboards",
    ],
  },
  {
    title: "School ERP",
    category: "Education",
    icon: "📚",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    desc: "School management system.",
    details: [
      "🎒 Student admission and profile management",
      "📅 Timetable and class scheduling",
      "📝 Exam management and mark entry",
      "✅ Daily attendance with parent alerts",
      "💰 Fee collection and receipt generation",
      "📚 Library management system",
      "🚌 School bus GPS tracking",
      "📱 Parent communication app",
    ],
  },
  {
    title: "Grocery Delivery",
    category: "Service",
    icon: "🛒",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    desc: "Online grocery ordering.",
    details: [
      "🛒 Category-wise product catalog",
      "⚡ Express delivery slot booking",
      "📦 Real-time order packing status",
      "🔔 Out-of-stock and restock alerts",
      "🎁 Offers, combos and subscription baskets",
      "🔄 Easy replacement and return workflow",
      "📊 Sales heatmap by locality",
      "💳 Wallet, UPI and COD payment support",
    ],
  },
  {
    title: "Job Portal",
    category: "Core",
    icon: "💼",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    desc: "Hiring & recruitment platform.",
    details: [
      "📄 Smart resume parsing and profile builder",
      "🔍 AI-powered job-candidate matching",
      "📢 Job posting with multi-board distribution",
      "🗓 Interview scheduling and tracking",
      "📊 Hiring funnel analytics for recruiters",
      "🏢 Employer brand pages",
      "🔔 Job alert subscriptions for candidates",
      "💬 In-app messaging between candidates and HR",
    ],
  },
  {
    title: "Real Estate",
    category: "Core",
    icon: "🏠",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    desc: "Property listing platform.",
    details: [
      "🏘 Buy, sell & rent property listings",
      "📸 Virtual tours and photo gallery",
      "🗺 Location intelligence and map search",
      "💰 EMI calculator and loan assistance",
      "📋 Document checklist and legal guidance",
      "👨‍💼 Agent and broker management module",
      "🔔 Price drop and new listing alerts",
      "📊 Market trends and locality insights",
    ],
  },
  {
    title: "Event Booking",
    category: "Service",
    icon: "🎟",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
    desc: "Event management system.",
    details: [
      "🎪 Event creation with rich media and agenda",
      "🪑 Seat map and ticket tier management",
      "💳 Secure ticket purchase and e-ticket delivery",
      "📊 Real-time attendance and ticket sales dashboard",
      "📸 Photo gallery and post-event recap",
      "🔔 Reminder notifications for registered attendees",
      "🤝 Sponsor and exhibitor management",
      "📋 Feedback and NPS collection post-event",
    ],
  },
  {
    title: "Travel System",
    category: "Transport",
    icon: "✈️",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
    desc: "Travel package booking.",
    details: [
      "🗺 Curated tour packages with itinerary builder",
      "✈️ Flight + hotel combo booking",
      "🏨 Partner hotel and resort integration",
      "🚌 Local transport and transfer booking",
      "💳 Flexible payment plans and EMI options",
      "📋 Travel document checklist and visa guidance",
      "⭐ Traveller reviews and destination guides",
      "🔔 Travel alerts and itinerary reminders",
    ],
  },
];

const categoryColors = {
  Business:   { bg: "bg-blue-50",   text: "text-blue-700",   accent: "from-blue-500 to-blue-400" },
  Enterprise: { bg: "bg-violet-50", text: "text-violet-700", accent: "from-violet-500 to-violet-400" },
  Transport:  { bg: "bg-green-50",  text: "text-green-700",  accent: "from-green-500 to-green-400" },
  Service:    { bg: "bg-amber-50",  text: "text-amber-700",  accent: "from-amber-500 to-amber-400" },
  Education:  { bg: "bg-teal-50",   text: "text-teal-700",   accent: "from-teal-500 to-teal-400" },
  Logistics:  { bg: "bg-orange-50", text: "text-orange-700", accent: "from-orange-500 to-orange-400" },
  Core:       { bg: "bg-pink-50",   text: "text-pink-700",   accent: "from-pink-500 to-pink-400" },
  Management: { bg: "bg-gray-100",  text: "text-gray-700",   accent: "from-gray-500 to-gray-400" },
};

export default function ProductsSection() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filtered = products.filter(
    (p) =>
      (active === "All" || p.category === active) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  const colors = (cat) => categoryColors[cat] || categoryColors.Business;

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#f8f9fc] min-h-screen overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[140px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-100 rounded-full blur-[120px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-blue-600 uppercase mb-3">
            Our Products
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Product Ecosystem
          </h2>
          <p className="text-gray-500 mt-3 text-base sm:text-lg max-w-xl mx-auto">
            42+ scalable digital products powering businesses worldwide
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-full border border-gray-200 bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all border ${
                active === cat
                  ? "bg-gray-900 text-white border-gray-900 shadow"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {filtered.map((item, i) => {
              const c = colors(item.category);
              return (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelected(item)}
                  className="group cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg overflow-hidden transition-all"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-40">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div
                      className="absolute inset-0 items-center justify-center text-5xl hidden"
                      style={{ background: "#f1f3f9" }}
                    >
                      {item.icon}
                    </div>
                    {/* Category badge over image */}
                    <span
                      className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}
                    >
                      {item.category}
                    </span>
                    {/* Number */}
                    <span className="absolute top-3 right-3 text-xs text-white font-mono bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{item.icon}</span>
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{item.desc}</p>
                    <div className={`h-0.5 w-8 rounded-full bg-gradient-to-r ${c.accent} group-hover:w-16 transition-all duration-300`} />
                    <div className="mt-3 flex items-center gap-1 text-xs text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View details <span>→</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400 text-sm">No products found.</div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 px-0 sm:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal image */}
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <img
                  src={selected.img}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="absolute inset-0 items-center justify-center text-6xl hidden"
                  style={{ background: "#f1f3f9" }}
                >
                  {selected.icon}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition text-lg leading-none"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-5">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{selected.icon}</span>
                    <div>
                      <p className="text-white font-bold text-xl leading-tight">{selected.title}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[selected.category]?.bg} ${categoryColors[selected.category]?.text}`}>
                        {selected.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal content */}
              <div className="p-5 sm:p-7 max-h-[60vh] overflow-y-auto">
                <p className="text-gray-500 text-sm mb-5">{selected.desc}</p>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Key Features</h4>
                <ul className="space-y-2.5">
                  {selected.details.map((point, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-xs">✓</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Modal footer */}
              <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-gray-100">
                <button
                  onClick={() => setSelected(null)}
                  className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}