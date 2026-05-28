"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HereToHelp() {
  return (
    <section className="relative bg-[#F5F5F0] overflow-hidden flex flex-col">
      {/* Centered content area */}
      <div className="flex-1 flex items-center justify-center py-20 md:py-28 lg:py-32">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-6 md:space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-forum text-3xl md:text-4xl lg:text-[2.625rem] text-[#1a1a1a] leading-tight"
            >
              We&apos;re here to help
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-instrument text-[#070E2E] text-base md:text-lg"
            >
              Discover our team and explore how we can collaborate with you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2"
            >
              <Link
                href="/contact"
                className="font-instrument font-semibold inline-block px-8 md:px-10 py-3 md:py-4 bg-primaryBlue text-white text-base rounded-full hover:bg-primaryBlue/90 hover:scale-[1.03] transition-all duration-200 ease-in-out"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative lines pinned to bottom */}
      <div className="w-full pointer-events-none">
        <Image
          src="/help-lines.svg"
          alt=""
          width={1920}
          height={200}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
    </section>
  );
}
