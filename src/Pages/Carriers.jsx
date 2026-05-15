import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function AboutUs() {

  const whatsappNumber = "917358039616";

  const offerings = [
    {
      title: "Online Courses",
      price: "1500",
      tagline: "Upgrade Your Skills • Build Your Future",
      points: [
        "Industry-ready curriculum",
        "Real-time projects",
        "Expert mentorship",
        "Flexible learning",
        "Certification included",
        "Career guidance",
        "Hands-on training",
        "Latest technologies",
        "Portfolio building",
        "Job-ready skills",
        "Global standards",
        "Affordable pricing",
        "Continuous updates",
        "Lifetime access",
        "Community support"
      ]
    },
    {
      title: "Online Internship",
      price: "1000",
      tagline: "Work • Learn • Grow with Poeage",
      points: [
        "Live company projects",
        "Mentor guidance",
        "Team collaboration",
        "Skill development",
        "Work experience",
        "Internship certificate",
        "Remote access",
        "Industry exposure",
        "Performance tracking",
        "Networking opportunities",
        "Flexible timing",
        "Career support",
        "Practical learning",
        "Resume building",
        "Placement opportunity"
      ]
    },
    {
      title: "E-Learning Portal",
      price: "500 / month",
      tagline: "Learn Anytime • Anywhere",
      points: [
        "Unlimited course access",
        "Multiple categories",
        "Video + practical content",
        "Daily updates",
        "Interactive learning",
        "Mobile friendly",
        "Self-paced modules",
        "Skill tracking",
        "Certification",
        "Affordable subscription",
        "Beginner to advanced",
        "Tech + business topics",
        "Continuous improvement",
        "Expert sessions",
        "Community learning"
      ]
    }
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-24 px-4 sm:px-6">

      <div className="max-w-7xl mx-auto space-y-20">

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          <div className="space-y-8">

            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Poeage Careers & Learning
            </h1>

            <p className="text-gray-500 text-sm sm:text-base max-w-lg">
              Build your future with <b>Courses</b>, <b>Internships</b> and <b>E-Learning</b> from Poeage ecosystem.
            </p>

            <div className="border-l-4 border-blue-600 pl-5">
              <p className="text-gray-600 italic text-sm sm:text-base">
                “Learn, Work and Grow with real-world experience.”
              </p>
            </div>

            {/* TOP WHATSAPP CTA */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi Poeage Team, I need details about your programs`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition font-medium"
            >
              <FaWhatsapp className="text-lg" />
              Chat on WhatsApp
            </a>

          </div>

          <div className="flex justify-center">
            <div className="bg-white border shadow-xl rounded-2xl p-6 text-center">
              <h2 className="font-bold text-lg">Poeage Platform</h2>
              <p className="text-sm text-gray-500 mt-2">
                Courses • Internship • Learning
              </p>
            </div>
          </div>

        </div>

        {/* OFFERINGS */}
        <div className="grid md:grid-cols-3 gap-8">

          {offerings.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-xl transition flex flex-col"
            >

              <h3 className="text-xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="text-blue-600 font-semibold mt-1">
                ₹ {item.price}
              </p>

              <p className="text-sm text-gray-500 mt-2 italic">
                {item.tagline}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-gray-600 flex-1">
                {item.points.map((p, j) => (
                  <li key={j}>✔ {p}</li>
                ))}
              </ul>

              {/* CTA BUTTONS */}
              <div className="mt-6 space-y-2">

                {/* MAIN BUTTON */}
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Enroll Now
                </button>

                {/* WHATSAPP BUTTON */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi Poeage Team, I am interested in ${item.title} (${item.price})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-green-500 text-green-600 py-2 rounded-lg hover:bg-green-50 transition text-sm font-medium"
                >
                  <FaWhatsapp className="text-green-500 text-lg" />
                  Chat on WhatsApp
                </a>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi Poeage Team`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <FaWhatsapp className="text-2xl" />
      </a>

    </section>
  );
}