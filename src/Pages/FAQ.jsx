import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is Poeage Group of Companies?",
    answer:
      "Poeage Group is a diversified business ecosystem delivering solutions in software, civil engineering, cloud, IT, and consulting through specialized companies.",
  },
  {
    question: "Which companies operate under Poeage Group?",
    answer:
      "Poeage Technologies, Poeage Builders, Poeage Nexus, Poeage Web Services, and Poeage IT Solutions.",
  },
  {
    question: "Do you provide services directly?",
    answer:
      "Services are delivered via each specialized company to ensure domain expertise and quality.",
  },
  {
    question: "How can I contact Poeage Group?",
    answer:
      "Use the Contact page or official enquiry channels to reach the appropriate team quickly.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative bg-white py-24 px-6 overflow-hidden">

      {/* softer background glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[320px] h-[320px] bg-blue-200/10 blur-[100px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[320px] h-[320px] bg-cyan-200/10 blur-[100px] rounded-full" />

      <div className="relative max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="text-sm text-blue-600 font-medium mb-2">
            Help Center
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Questions</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Everything you need to know about Poeage Group and our services.
          </p>
        </div>

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-6"
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i;

            return (
              <motion.div key={i} variants={item} className="group relative">

                {/* subtle gradient edge (reduced intensity) */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition duration-300" />

                <div
                  className={`relative bg-white/90 backdrop-blur rounded-2xl p-6 border transition-all duration-300
                  ${isOpen ? "shadow-lg border-blue-200" : "border-gray-100 hover:shadow-md"}`}
                >

                  {/* QUESTION */}
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-4"
                  >

                    <div className="flex gap-3 items-start">
                      <div className={`p-2 rounded-lg transition ${isOpen ? "bg-blue-100" : "bg-gray-100 group-hover:bg-blue-50"}`}>
                        <HelpCircle size={18} className={isOpen ? "text-blue-600" : "text-gray-500"} />
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`text-xl font-bold ${isOpen ? "text-blue-600" : "text-gray-400"}`}
                    >
                      +
                    </motion.span>
                  </button>

                  {/* divider */}
                  {isOpen && <div className="mt-4 h-px bg-gray-200/70" />}

                  {/* ANSWER */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA (slightly refined) */}
        <div className="mt-16 text-center">
          <div className="inline-block w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-7 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-1">
              Still have questions?
            </h3>
            <p className="text-sm opacity-90 mb-3">
              Talk to our team and get instant help.
            </p>
            <button className="bg-white text-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}