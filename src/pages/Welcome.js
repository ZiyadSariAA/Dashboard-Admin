import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Welcome = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(true);

  const handleContinue = () => {
    setShowContent(false);
    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F7D53] to-[#18230F] flex items-center justify-center px-4 relative overflow-hidden">
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-center space-y-6 max-w-xl"
          >
            {/* FCIT Heading */}
            <h2 className="text-5xl font-extrabold text-[#D6EFC7] tracking-widest">
              FCIT
            </h2>

            {/* Main Welcome Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-snug">
              👋 Welcome to Brainshub Admin Panel
            </h1>

            {/* Subtext */}
            <p className="text-lg text-[#D6EFC7] leading-relaxed max-w-md mx-auto">
              Manage students, advisors, and projects with ease —
              all in one place.
            </p>

            {/* CTA Button */}
            <motion.button
              onClick={handleContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 bg-[#255F38] hover:bg-[#1F7D53] text-white font-medium px-6 py-3 rounded-lg transition duration-300"
            >
              Enter Dashboard
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Welcome;
