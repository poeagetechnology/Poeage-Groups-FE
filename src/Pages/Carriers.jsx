import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Firebase imports
import { db, storage } from "../Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const companiesJobs = [
  {
    company: "Poeage Technologies",
    location: "Remote",
    jobs: ["Frontend Developer", "Backend Developer", "AI Engineer"],
  },
  {
    company: "Poeage Builders",
    location: "Onsite",
    jobs: ["Site Engineer", "Project Manager"],
  },
  {
    company: "Poeage Nexus",
    location: "Hybrid",
    jobs: ["HR Executive", "Career Consultant"],
  },
  {
    company: "Poeage IT Solutions",
    location: "Remote",
    jobs: ["DevOps Engineer", "System Admin"],
  },
  {
    company: "Poeage Digital Marketing",
    location: "Hybrid",
    jobs: ["SEO Specialist", "Content Strategist"],
  },
];

export default function PoeageNexusPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // ✅ Success state
  const [successMessage, setSuccessMessage] = useState("");

  const filteredData = companiesJobs.map((c) => ({
    ...c,
    jobs: c.jobs.filter((job) =>
      job.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || c.location === filter)
    ),
  })).filter((c) => c.jobs.length > 0);

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const mobileNumber = form.mobileNumber?.value || "";
    const file = form.resumeFile.files[0];

    let fileURL = "";

    try {
      // Upload file
      if (file) {
        const storageRef = ref(storage, `resumes/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        fileURL = await getDownloadURL(storageRef);
      }

      // Save data
      await addDoc(collection(db, "applications"), {
        name,
        email,
        mobileNumber,
        fileURL,
        job: selectedJob?.job || "",
        company: selectedJob?.company || "",
        createdAt: serverTimestamp(),
      });

      // ✅ Success animation
      setSuccessMessage("Application sent successfully. Thank you for applying! 🎉");

      form.reset();

      setTimeout(() => {
        setSelectedJob(null);
        setSuccessMessage("");
      }, 2500);

    } catch (error) {
      console.error("FULL ERROR:", error);
      alert(error.message);
    }
  };

  return (
    <div className="bg-white text-gray-800">

      {/* HERO */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-2xl lg:text-4xl font-bold mb-4">
          Build Your Career with
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            {" "}Poeage Group
          </span>
        </h1>
        <p className="text-gray-500">
          Discover opportunities across our ecosystem and grow with innovation.
        </p>
      </section>

      {/* SEARCH + FILTER */}
      <section className="px-6 mb-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:col-span-2 px-4 py-2 border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 border border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500"
          >
            <option value="All">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
          </select>
        </div>
      </section>

      {/* JOB LIST */}
      <section className="py-10 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-10">

          {filteredData.map((c, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="bg-white rounded-2xl shadow-md border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {c.company}
                <span className="text-sm text-gray-500 ml-2">({c.location})</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {c.jobs.map((job, j) => (
                  <div
                    key={j}
                    className="flex justify-between items-center border rounded-lg px-4 py-3 hover:shadow transition"
                  >
                    <div>
                      <h4 className="font-medium">{job}</h4>
                      <p className="text-sm text-gray-500">Full Time</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedJob({ job, company: c.company })}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* APPLY MODAL */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl p-8 w-full max-w-md"
            >
              <h3 className="text-xl font-semibold mb-2">
                Apply for {selectedJob.job}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {selectedJob.company}
              </p>

              {/* ✅ SUCCESS ANIMATION */}
              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center mb-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="text-green-500 text-4xl mb-2"
                    >
                      ✔
                    </motion.div>
                    <p className="text-green-600 text-sm font-medium">
                      {successMessage}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">

                <input name="name" placeholder="Your Name" className="w-full px-4 py-3 border border-cyan-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500" required />
                <input name="email" placeholder="Email" className="w-full px-4 py-3 border border-cyan-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500" required />
                <input name="mobileNumber" placeholder="Mobile Number" className="w-full px-4 py-3 border border-cyan-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500" />

                <input type="file" name="resumeFile" className="w-full px-3 py-2 border border-cyan-500 rounded-xl" />

                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-medium">
                  Submit Application
                </button>

              </form>

              <button onClick={() => setSelectedJob(null)} className="mt-4 text-sm text-gray-500">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}