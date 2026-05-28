"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "@/data/services";

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  return (
    <div className="flex justify-center items-center bg-transparent z-50 absolute top-2 left-0 right-0">
      <div className="container w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-0">
        <nav className="py-4 relative">
          <div className="flex justify-between items-center w-full">
            <Link href="/" className="flex items-center">
              <Image
                src="/Logo.svg"
                alt="Logo"
                width={400}
                height={60}
                className="w-[180px] sm:w-[220px] lg:w-[280px] xl:w-[400px] h-auto brightness-0 invert"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center gap-8">
                <li>
                  <Link
                    href="/"
                    className="flex justify-center items-center gap-x-1 text-white hover:text-white/80 transition-colors duration-200 ease-in-out text-base font-instrument relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:-bottom-1 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="flex justify-center items-center gap-x-1 text-white hover:text-white/80 transition-colors duration-200 ease-in-out text-base font-instrument relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:-bottom-1 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    About MRNP
                  </Link>
                </li>
                <li className="relative">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="flex justify-center items-center gap-x-1 text-white hover:text-white/80 transition-colors duration-200 ease-in-out text-base cursor-pointer font-instrument focus:outline-none relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:-bottom-1 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Services
                    <motion.span
                      animate={{ rotate: isServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>
                </li>
              </ul>
              <Link
                href="/contact"
                className="bg-white text-primaryBlue hover:bg-white/90 transition-colors duration-200 ease-in-out px-6 py-2 rounded-full font-instrument text-base font-medium"
              >
                Contact Us
              </Link>
              <button
                onClick={() => setIsMobileOpen(true)}
                className="focus:outline-none"
              >
                <Menu className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden focus:outline-none"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Services Mega Menu (desktop) */}
          <AnimatePresence>
            {isServicesOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsServicesOpen(false)}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 h-screen w-screen left-0 top-0"
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute top-full left-0 right-0 mt-4 bg-white shadow-2xl p-8 md:p-12 z-50 border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                    <div className="md:w-1/3 flex items-center justify-center">
                      <h2 className="font-forum text-6xl md:text-7xl text-[#061143]">
                        Services
                      </h2>
                    </div>
                    <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {servicesData.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={() => setIsServicesOpen(false)}
                          className="font-instrument text-[#061143] text-lg font-normal hover:text-[#061143]/70 transition-colors duration-200 flex items-center"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsServicesOpen(false)}
                    className="absolute top-6 right-6 text-primaryBlue hover:rotate-90 transition-transform duration-300"
                  >
                    <X size={24} />
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ── MOBILE ACTION MENU (floating card) ── */}
          <AnimatePresence>
            {isMobileOpen && (
              <>
                {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-[60]"
            />

            {/* Floating card — below nav bar on the right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
              className="absolute top-full right-0 mt-1 w-[340px] bg-white z-[70] rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              {/* Close button */}
              <div className="flex justify-end px-4 pt-4 pb-1">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="text-primaryBlue focus:outline-none"
                  aria-label="Close menu"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex flex-col">
                <Link
                  href="/"
                  onClick={() => setIsMobileOpen(false)}
                  className="font-instrument font-normal text-primaryBlue text-base px-5 py-2 hover:bg-gray-50 transition-colors"
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  onClick={() => setIsMobileOpen(false)}
                  className="font-instrument font-normal text-primaryBlue text-base px-5 py-2 hover:bg-gray-50 transition-colors"
                >
                  About MRNP
                </Link>

                {/* Services accordion */}
                <div>
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="w-full flex justify-between items-center font-instrument font-normal text-primaryBlue text-base px-5 py-2 hover:bg-gray-50 transition-colors focus:outline-none"
                  >
                    Services
                    <motion.span
                      animate={{ rotate: isMobileServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={18} strokeWidth={1.5} />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {isMobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-gray-50"
                      >
                        {servicesData.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            onClick={() => setIsMobileOpen(false)}
                            className="block font-instrument font-normal text-primaryBlue text-sm px-8 py-2 hover:text-primaryBlue/70 transition-colors"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/careers"
                  onClick={() => setIsMobileOpen(false)}
                  className="font-instrument font-normal text-primaryBlue text-base px-5 py-2 hover:bg-gray-50 transition-colors"
                >
                  Life@MRNP
                </Link>

                <Link
                  href="/who-we-serve"
                  onClick={() => setIsMobileOpen(false)}
                  className="font-instrument font-normal text-primaryBlue text-base px-5 py-2 hover:bg-gray-50 transition-colors"
                >
                  Who we serve
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="font-instrument font-normal text-primaryBlue text-base px-5 py-2 hover:bg-gray-50 transition-colors"
                >
                  Contact Us
                </Link>
              </nav>

              {/* Copyright */}
              <div className="px-5 py-4">
                <p className="font-instrument text-[11px] text-gray-400">
                  © 2026 MRNP. All rights reserved.
                </p>
              </div>
            </motion.div>
              </>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </div>
  );
}
