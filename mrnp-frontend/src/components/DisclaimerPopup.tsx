"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DisclaimerPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
    // Check if the user has already accepted the disclaimer in this session
    const hasAccepted = sessionStorage.getItem("mrnp-disclaimer-accepted");
    if (!hasAccepted) {
      // Small delay for smooth appearance after page load
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleProceed = () => {
    if (isChecked) {
      sessionStorage.setItem("mrnp-disclaimer-accepted", "true");
      setIsOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0 }}
            className="relative w-full max-w-[800px] max-h-full overflow-hidden bg-white shadow-2xl flex flex-col rounded-md"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-3 md:px-8 md:pt-8 md:pb-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-inter">
                Disclaimer
              </h2>
            </div>

            {/* Content body */}
            <div className="px-6 pb-6 md:px-8 md:pb-8 text-[14px] md:text-[15px] leading-relaxed text-gray-800 space-y-5 font-inter overflow-y-auto">
              <p>
                The Institute of Chartered Accountants of India does not permit advertisement or solicitation by Chartered Accountants in any form or manner. By accessing this website, you acknowledge and confirm that you are seeking information relating to MRNP & Co LLP on your own accord and that there has been no form of solicitation, advertisement or inducement by MRNP & Co LLP or its partners or employees.
              </p>
              
              <p>
                The contents of this website are for informational purposes only and should not be interpreted as soliciting or advertising. No information provided on this website should be used or construed as substitute of professional advice. MRNP & Co LLP shall not be liable for consequences of any action taken by relying on the information provided on this website. It is recommended that the readers should take professional advice before acting on the same.
              </p>

              <p>
                The contents of this website are the intellectual property of MRNP & Co LLP.
              </p>
            </div>

            {/* Footer / Actions */}
            <div className="bg-[#f0f2f5] px-6 py-5 md:px-8 md:py-6 flex flex-col gap-4 md:gap-5 border-t border-gray-200 mt-auto">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center pt-1">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-[4px] border-2 border-orange-400 bg-white checked:bg-orange-400 checked:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all"
                  />
                  <svg
                    className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-[14px] md:text-[15px] italic text-[#1b2b41] font-inter">
                  I have read and understood above and I agree with the terms of usage of this website.
                </span>
              </label>

              <div>
                <button
                  onClick={handleProceed}
                  disabled={!isChecked}
                  className={`px-8 py-2.5 rounded text-[14px] md:text-[15px] font-medium font-inter transition-all ${
                    isChecked
                      ? "bg-[#1b365d] text-white hover:bg-[#122542] cursor-pointer"
                      : "bg-[#1b365d]/50 text-white/80 cursor-not-allowed"
                  }`}
                >
                  Proceed
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
