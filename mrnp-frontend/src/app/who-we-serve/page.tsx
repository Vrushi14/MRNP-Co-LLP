"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HereToHelp from "@/components/HereToHelp";

export default function WhoWeServePage() {
  const industries = [
    { name: "Pharmaceuticals", image: "/industries/pharmaceuticals.png" },
    { name: "Infrastructure", image: "/industries/infrastructure.png" },
    { name: "Telecommunication", image: "/industries/telecommunication.png" },
    { name: "Power Sectors", image: "/industries/power-sectors.png" },
    { name: "Agriculture", image: "/industries/agriculture.png" },
    { name: "Traders", image: "/industries/traders.png" },
    { name: "Importers & Exporters", image: "/industries/importers-exporters.png" },
    { name: "Cargo Handlers", image: "/industries/cargo-handlers.png" },
    { name: "Hospitality Industry", image: "/industries/hospitality-industry.png" },
    { name: "Service Providers", image: "/industries/service-providers.png" },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* ── HERO ── */}
      <section className="relative bg-primaryBlue pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
        <Navbar />
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-8 md:mb-12 lg:mb-16 max-w-7xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-forum text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] 2xl:text-[6.5rem] md:leading-tight lg:leading-[5rem] xl:leading-[6.5rem] bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent pb-2"
            >
              Industries We Serve
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-instrument text-base md:text-lg lg:text-xl xl:text-2xl text-white max-w-3xl leading-relaxed"
            >
              Discover the industries and clients we serve at MRNP. From healthcare
              to finance, we provide tailored solutions across diverse sectors.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="w-full">
        <div className="w-full bg-[#F2F5F1] border-[#B4B4B4] border-b">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="relative flex flex-col items-center justify-center py-12 lg:py-16">
                <h3 className="font-forum text-5xl lg:text-[5rem] text-primaryBlue mb-4">
                  <CountUp end={10} duration={2} enableScrollSpy scrollSpyOnce />+
                </h3>
                <p className="font-instrument text-base lg:text-2xl font-medium text-primaryBlue">Industries Served</p>
                <div className="absolute right-0 top-12 bottom-12 hidden w-px bg-[#B4B4B4] md:block"></div>
              </div>
              <div className="relative flex flex-col items-center justify-center py-12 lg:py-16">
                <h3 className="font-forum text-5xl lg:text-[5rem] text-primaryBlue mb-4">
                  <CountUp end={6} duration={2} enableScrollSpy scrollSpyOnce />
                </h3>
                <p className="font-instrument text-base lg:text-2xl font-medium text-primaryBlue">Multi-State Presence</p>
                <div className="absolute right-0 top-12 bottom-12 hidden w-px bg-[#B4B4B4] md:block"></div>
              </div>
              <div className="relative flex flex-col items-center justify-center py-12 lg:py-16">
                <h3 className="font-forum text-5xl lg:text-[5rem] text-primaryBlue mb-4">
                  <CountUp end={13} duration={2} enableScrollSpy scrollSpyOnce />+
                </h3>
                <p className="font-instrument text-base lg:text-2xl font-medium text-primaryBlue">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── PERSONALIZED APPROACH ── */}
        <div className="container w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-0 py-12 lg:py-16 mx-auto">
          <h2 className="font-forum text-3xl lg:text-5xl text-primaryBlue mb-6">Personalized Approach :</h2>
          <p className="font-instrument text-base lg:text-lg text-[#191919] mb-12 max-w-4xl">
            Our meticulous audit process incorporates a thorough evaluation of your internal controls
            and a close examination of your accounting policies, all aligned with your specific
            management requirements. This in-depth analysis allows us to deliver insightful
            recommendations that address:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative flex">
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <h3 className="font-instrument lg:text-xl text-lg font-semibold text-primaryBlue mb-4">Business Entities</h3>
                <ul className="space-y-2">
                  <li className="font-instrument text-[12px] lg:text-sm text-[#191919] flex items-start">
                    <span className="mr-3 mt-2 flex h-[0.3rem] w-[0.3rem] shrink-0 rounded-full bg-primaryBlue"></span>
                    <span>Companies incorporated under the Companies Act</span>
                  </li>
                  <li className="font-instrument text-[12px] lg:text-sm text-[#191919] flex items-start">
                    <span className="mr-3 mt-2 flex h-[0.3rem] w-[0.3rem] shrink-0 rounded-full bg-primaryBlue"></span>
                    <span>Partnership Firms, including Limited Liability Partnerships (LLPs)</span>
                  </li>
                  <li className="font-instrument text-[12px] lg:text-sm text-[#191919] flex items-start">
                    <span className="mr-3 mt-2 flex h-[0.3rem] w-[0.3rem] shrink-0 rounded-full bg-primaryBlue"></span>
                    <span>Government Companies</span>
                  </li>
                  <li className="font-instrument text-[12px] lg:text-sm text-[#191919] flex items-start">
                    <span className="mr-3 mt-2 flex h-[0.3rem] w-[0.3rem] shrink-0 rounded-full bg-primaryBlue"></span>
                    <span>Sole Proprietorships</span>
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-6 right-0 top-6 hidden w-px bg-[#B4B4B4] lg:block"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-[#B4B4B4]"></div>
            </div>

            <div className="relative flex">
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <h3 className="font-instrument lg:text-xl text-lg font-semibold text-primaryBlue mb-4">Public Sector</h3>
                <ul className="space-y-2">
                  <li className="font-instrument text-[12px] lg:text-sm text-[#191919] flex items-start">
                    <span className="mr-3 mt-2 flex h-[0.3rem] w-[0.3rem] shrink-0 rounded-full bg-primaryBlue"></span>
                    <span>Government Organizations</span>
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-6 right-0 top-6 hidden w-px bg-[#B4B4B4] lg:block"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-[#B4B4B4]"></div>
            </div>

            <div className="relative flex">
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <h3 className="font-instrument lg:text-xl text-lg font-semibold text-primaryBlue mb-4">Non-Profit Organizations</h3>
                <ul className="space-y-2">
                  <li className="font-instrument text-[12px] lg:text-sm text-[#191919] flex items-start">
                    <span className="mr-3 mt-2 flex h-[0.3rem] w-[0.3rem] shrink-0 rounded-full bg-primaryBlue"></span>
                    <span>Charitable Institutions</span>
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-[#B4B4B4]"></div>
            </div>

            <div className="relative flex">
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <h3 className="font-instrument lg:text-xl text-lg font-semibold text-primaryBlue mb-4">Educational Institutions</h3>
                <ul className="space-y-2">
                  <li className="font-instrument text-[12px] lg:text-sm text-[#191919] flex items-start">
                    <span className="mr-3 mt-2 flex h-[0.3rem] w-[0.3rem] shrink-0 rounded-full bg-primaryBlue"></span>
                    <span>Schools</span>
                  </li>
                  <li className="font-instrument text-[12px] lg:text-sm text-[#191919] flex items-start">
                    <span className="mr-3 mt-2 flex h-[0.3rem] w-[0.3rem] shrink-0 rounded-full bg-primaryBlue"></span>
                    <span>Colleges</span>
                  </li>
                  <li className="font-instrument text-[12px] lg:text-sm text-[#191919] flex items-start">
                    <span className="mr-3 mt-2 flex h-[0.3rem] w-[0.3rem] shrink-0 rounded-full bg-primaryBlue"></span>
                    <span>Universities</span>
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-6 right-0 top-6 hidden w-px bg-[#B4B4B4] lg:block"></div>
            </div>

            <div className="relative flex">
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <h3 className="font-instrument lg:text-xl text-lg font-semibold text-primaryBlue mb-4">International Trade</h3>
                <ul className="space-y-2">
                  <li className="font-instrument text-[12px] lg:text-sm text-[#191919] flex items-start">
                    <span className="mr-3 mt-2 flex h-[0.3rem] w-[0.3rem] shrink-0 rounded-full bg-primaryBlue"></span>
                    <span>Export-Import Companies</span>
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-6 right-0 top-6 hidden w-px bg-[#B4B4B4] lg:block"></div>
            </div>

            <div className="relative flex">
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <h3 className="font-instrument lg:text-xl text-lg font-semibold text-primaryBlue mb-4">Financial Institutions</h3>
                <ul className="space-y-2">
                  <li className="font-instrument text-[12px] lg:text-sm text-[#191919] flex items-start">
                    <span className="mr-3 mt-2 flex h-[0.3rem] w-[0.3rem] shrink-0 rounded-full bg-primaryBlue"></span>
                    <span>Banking Companies (Private, Nationalized, and Co-operatives)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRY EXPERTISE ── */}
      <section className="flex justify-center items-center pb-14 lg:pb-24">
        <div className="container w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-0 flex flex-col justify-center items-center space-y-9 lg:space-y-12">
          <div className="space-y-3 md:space-y-5 text-center md:max-w-4xl">
            <h2 className="font-forum text-primaryBlue text-[2rem] md:text-[2.25rem] lg:text-[2.625rem] md:leading-[3.125rem] 2xl:text-[2.625rem] 2xl:leading-tight leading-tight lg:text-5xl">
              Industry Expertise
            </h2>
            <p className="font-instrument text-[#191919] text-[0.875rem] md:text-[1rem] md:leading-[1.25rem] xl:text-[1.125rem] 2xl:leading-[1.5rem]">
              Our experienced team has a deep understanding of the complexities and regulations
              specific to various sectors. We are well-versed in serving clients in the following
              industries:
            </p>
          </div>

          <motion.div 
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 lg:gap-5 w-full"
          >
            {industries.map((industry, idx) => (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                className="bg-[#F2F5F1] border border-[#d9d9d9] flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.875rem)] lg:w-[calc(20%-1rem)]"
              >
                <Image
                  src={industry.image}
                  alt={industry.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-auto aspect-[4/3]"
                />
                <p className="font-instrument text-base md:text-lg lg:text-lg 2xl:text-xl text-primaryBlue py-4 font-medium text-center">
                  {industry.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <HereToHelp />
      <Footer />
    </main>
  );
}
