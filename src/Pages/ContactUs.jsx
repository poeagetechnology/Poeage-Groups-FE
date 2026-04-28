import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";

// ✅ Firebase imports
import { db } from "../Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function GetInTouch() {
  // ✅ Success state
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const firstName = form[0].value;
    const lastName = form[1].value;
    const email = form[2].value;
    const subject = form[3].value;
    const message = form[4].value;

    try {
      await addDoc(collection(db, "messages"), {
        firstName,
        lastName,
        email,
        subject,
        message,
        createdAt: serverTimestamp(),
      });

      // ✅ Success message (no alert)
      setSuccessMessage("Message sent successfully. We’ll get back to you soon! 🎉");
      form.reset();

      setTimeout(() => {
        setSuccessMessage("");
      }, 2500);

    } catch (error) {
      console.error("ERROR:", error);
      alert(error.message);
    }
  };

  return (
    <section className="bg-white py-20 px-6">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >

        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-14">
          <p className="text-sm text-blue-600 font-medium mb-2 tracking-wide">
            Let's Connect
          </p>
          <h2 className="text-3xl lg:text-4xl  font-bold text-gray-900">
            Get in <span className="text-blue-600">Touch</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Feel free to connect with us. We're always here to help you.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >

          {/* Company Card */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
          >

            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6">
              <h3 className="text-lg font-semibold">Company Details</h3>
              <p className="text-sm opacity-90">We'd love to hear from you!</p>
            </div>

            <div className="p-6 space-y-5 text-sm text-gray-600">
              <motion.div variants={fadeUp} className="flex items-start gap-3">
                <MapPin className="text-blue-600" size={20} />
                <p>
                  36A, Main Road, Ayyamplayam Kavundhapadi, Erode, Tamil Nadu
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <Phone className="text-green-500" size={20} />
                <p>+91 80568 89616</p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <Mail className="text-purple-500" size={20} />
                <p>info@poeagegroups.com</p>
              </motion.div>
            </div>

            {/* Map */}
            <motion.div variants={fadeUp} className="px-6 pb-6">
              <div className="rounded-xl overflow-hidden border">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps?q=Erode%20Tamil%20Nadu&output=embed"
                  className="w-full h-56 border-0"
                  loading="lazy"
                ></iframe>
              </div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="https://maps.google.com?q=Erode Tamil Nadu"
                className="mt-4 block text-center border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                Open in Google Maps
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
          >

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Send className="text-blue-600" size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  Send Us a Message
                </h3>
                <p className="text-sm text-gray-500">
                  We'll get back to you as soon as possible.
                </p>
              </div>
            </div>

            {/* ✅ Success Message (no UI change) */}
            {successMessage && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 text-sm text-center mb-3 font-medium"
              >
                {successMessage}
              </motion.p>
            )}

            {/* ✅ ONLY CHANGE: added onSubmit */}
            <motion.form onSubmit={handleSubmit} variants={stagger} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <motion.input variants={fadeUp} type="text" placeholder="First Name" className="input" />
                <motion.input variants={fadeUp} type="text" placeholder="Last Name" className="input" />
              </div>

              <motion.input variants={fadeUp} type="email" placeholder="Email Address" className="input" />
              <motion.input variants={fadeUp} type="text" placeholder="Subject" className="input" />

              <motion.textarea variants={fadeUp} rows="4" placeholder="Your Message" className="input" />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
              >
                <Send size={18} /> Send Message
              </motion.button>
            </motion.form>

            <motion.div variants={fadeUp} className="flex justify-between mt-6 text-xs text-gray-500">
              <span>🔒 Secure & Safe</span>
              <span>⚡ Quick Response</span>
              <span>💬 24/7 Support</span>
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 0.6rem;
          padding: 0.7rem 0.9rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
        }
      `}</style>
    </section>
  );
}