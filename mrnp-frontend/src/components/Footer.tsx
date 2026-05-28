"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-primaryBlue flex justify-center items-center">
      <div className="container w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-0"
        >
          <div className="py-12 md:py-16 lg:py-20 lg:pr-12 flex flex-col justify-between relative">
            <div>
              <Image
                src="/logo-footer.svg"
                alt="Logo"
                width={300}
                height={50}
                className="mb-6"
              />
              <p className="font-instrument text-xs text-white leading-relaxed max-w-xs mb-8">
                MRNP & CO LLP focus on providing tailor-made solutions to the
                challenging problems of our clients and perform with
                high-quality and timely service.
              </p>
            </div>
            <div className="font-instrument text-xs text-white">
              <p>© 2026 MRNP. All rights reserved.</p>
              <p className="mt-2">
                Design and Developed @{" "}
                <span>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://agnescreative.agency/"
                  >
                    Agnes Creative
                  </a>
                </span>
              </p>
            </div>
            <div className="hidden lg:block absolute right-0 top-0 h-full w-px bg-white/10"></div>
          </div>

          <div className="py-12 md:py-16 lg:py-20 lg:px-12 relative">
            <h3 className="font-inter text-base font-semibold text-white mb-6 uppercase tracking-wider">
              Company
            </h3>
            <div className="space-y-3 flex flex-col">
              <Link
                className="font-inter text-sm text-gray-300 hover:text-white transition-colors"
                href="/"
              >
                Home
              </Link>
              <Link
                className="font-inter text-sm text-gray-300 hover:text-white transition-colors"
                href="/about"
              >
                About MRNP
              </Link>
              <Link
                className="font-inter text-sm text-gray-300 hover:text-white transition-colors"
                href="/careers"
              >
                Life@MRNP
              </Link>
              <Link
                className="font-inter text-sm text-gray-300 hover:text-white transition-colors"
                href="/who-we-serve"
              >
                Who we serve
              </Link>
            </div>
            <div className="hidden lg:block absolute right-0 top-0 h-full w-px bg-white/10"></div>
          </div>

          <div className="py-12 md:py-16 lg:py-20 lg:px-12 relative">
            <h3 className="font-inter text-base font-semibold text-white mb-6 uppercase tracking-wider">
              Services
            </h3>
            <div className="space-y-3 flex flex-col text-sm text-gray-300">
              <Link href="/services/audit-and-assurance" className="hover:text-white transition-colors">Audit & Assurance Services</Link>
              <Link href="/services/Business-Consultancy-and-Advisory" className="hover:text-white transition-colors">Business Consultancy & Advisory</Link>
              <Link href="/services/Changes-in-Accounting-Standards-and-Legislations" className="hover:text-white transition-colors">Changes in Accounting Standards & Legislations</Link>
              <Link href="/services/Governance-and-Risk-Management" className="hover:text-white transition-colors">Governance & Risk Management</Link>
              <Link href="/services/management-recommendations" className="hover:text-white transition-colors">Management Recommendations</Link>
              <Link href="/services/Tax-Consultancy" className="hover:text-white transition-colors">Tax Consultancy</Link>
            </div>
            <div className="hidden lg:block absolute right-0 top-0 h-full w-px bg-white/10"></div>
          </div>

          <div className="py-12 md:py-16 lg:py-20 lg:pl-12">
            <h3 className="font-inter text-base font-semibold text-white mb-6 uppercase tracking-wider">
              Stay Connected
            </h3>
            <div className="space-y-3 flex flex-col">
              <Link
                className="font-inter text-sm text-gray-300 hover:text-white transition-colors"
                href="#"
              >
                Facebook
              </Link>
              <Link
                className="font-inter text-sm text-gray-300 hover:text-white transition-colors"
                href="#"
              >
                Twitter / X
              </Link>
              <Link
                className="font-inter text-sm text-gray-300 hover:text-white transition-colors"
                href="#"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
