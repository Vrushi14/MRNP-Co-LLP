"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HereToHelp from "@/components/HereToHelp";

const offices = [
  {
    city: "Bangalore",
    address: "6, 1st Floor, 13th Main, 3rd Cross, M.S. Ramaiah Enclave, B/h Nagasandra Metro Station, Bangalore - 560073",
    phone: "8095290539",
    email: "bangalore@mrnp.in",
    mapQuery: "MRNP & CO LLP Bangalore",
  },
  {
    city: "Ahmedabad",
    address: "Infinity Tower, A - 809, Corporate Rd, near Ramada Hotel, Prahlad Nagar, Ahmedabad-380015",
    phone: null,
    email: "ahmedabad@mrnp.in",
    mapQuery: "M R N P & Co. LLP Ahmedabad",
  },
  {
    city: "Surat",
    address: "422-A, Square One, Althan Bhimrad Canal Road, 2nd VIP Road, Bhimrad, Surat-395017",
    phone: "6354537761",
    email: "surat@mrnp.in",
    mapQuery: "MRNP & CO LLP Surat",
  },
  {
    city: "Vadodara",
    address: "301-A, Lotus Aura-2, Opp. Lilleria Party Plot, Sama-Savli Rd, Near IOCL Petrol Pump, Vadodara-390024",
    phone: "6352162199",
    email: "baroda@mrnp.in",
    mapQuery: "MRNP AND CO LLP VADODARA",
  },
  {
    city: "Raipur",
    address: "309, 3rd Floor, Lal Ganga Midas, Fafadih, Raipur (C.G) - 492009",
    phone: "07714902367",
    email: "raipur@mrnp.in",
    mapQuery: "MRNP & CO LLP Raipur",
  },
  {
    city: "Gandhidham",
    address: "Iris House, 2nd Floor, Plot No. 39, Ward 7/C, Opp. P.N Amersy School, Gurukul Road, Gandhidham (Kutch) - 370201",
    phone: "9157971928",
    email: "gandhidham@mrnp.in",
    mapQuery: "MRNP & CO LLP (CA) Gandhidham",
  },
  {
    city: "Bhuj",
    address: "3, 1st Floor, Royal Plaza, Nr. Cargo Honda Showroom, College Road, Bhuj (Kutch) - 370001",
    phone: "8200523428",
    email: "bhuj@mrnp.in",
    mapQuery: "Royal Plaza, College Road, Bhuj, Gujarat 370001",
  }
];

export default function ContactPage() {
  const [selectedOffice, setSelectedOffice] = useState(offices[0]);

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-primaryBlue pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
        <Navbar />
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-8 md:mb-12 lg:mb-16 max-w-7xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-forum text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] text-white leading-tight mb-3 md:mb-5"
            >
              Connect with us
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white flex justify-center items-center py-12 lg:py-24">
        <div className="container w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-0">
          
          <div className="flex items-center gap-10 md:gap-20 lg:gap-40 mb-12 lg:mb-16">
            <h2 className="font-forum text-3xl lg:text-4xl xl:text-5xl text-primaryBlue whitespace-nowrap">
              Our Offices Across India
            </h2>
            <div className="flex-1 h-[7px] bg-primaryBlue hidden sm:block"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Offices List */}
            <motion.div 
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8 lg:space-y-10"
            >
              {offices.map((office, idx) => {
                const isSelected = selectedOffice.city === office.city;
                return (
                  <motion.div 
                    key={idx} 
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    className="space-y-3 border-l-4 border-transparent pl-4 hover:border-primaryBlue transition-colors duration-[250ms] cursor-pointer" 
                    onClick={() => setSelectedOffice(office)}
                  >
                    <h3 className="font-instrument cursor-pointer text-2xl lg:text-[1.75rem] font-medium text-primaryBlue">
                      {office.city}
                    </h3>
                    <p className="font-instrument text-base lg:text-lg text-[#191919] leading-relaxed">
                      {office.address}
                    </p>
                    <div className="flex gap-2 items-center">
                      <div className="flex items-center gap-3 px-6 py-2 border-2 border-[#B4B4B4] rounded-full hover:border-primaryBlue transition-all duration-300 group cursor-pointer">
                        <span className="font-instrument text-base lg:text-lg text-primaryBlue flex items-center gap-2">
                          {office.phone && (
                            <>
                              <a href={`tel:${office.phone}`} className="hover:underline transition-all duration-300">
                                +91 {office.phone}
                              </a>
                              <span className="text-gray-400">{"//"}</span>
                            </>
                          )}
                          <a href={`mailto:${office.email}`} className="hover:underline transition-all duration-300">
                            {office.email}
                          </a>
                        </span>
                      </div>
                      <div
                        className={`p-3 rounded-full border border-[#B4B4B4] cursor-pointer transition-all duration-300 flex items-center justify-center group ${
                          isSelected
                            ? "bg-primaryBlue text-white border-primaryBlue"
                            : "bg-white text-primaryBlue hover:bg-primaryBlue hover:text-white"
                        }`}
                      >
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Sticky Map */}
            <div className="relative">
              <div className="sticky top-28 h-fit hidden lg:block">
                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg border border-gray-200">
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedOffice.mapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-[600px] border-0"
                    loading="lazy"
                    title={`Map of ${selectedOffice.city}`}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

          </div>

          {/* Mobile Map - Shows at bottom of list on mobile */}
          <div className="mt-12 lg:hidden">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedOffice.mapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-[400px] border-0"
                loading="lazy"
                title={`Map of ${selectedOffice.city}`}
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>
      </section>
      
      <HereToHelp />
      <Footer />
    </main>
  );
}
