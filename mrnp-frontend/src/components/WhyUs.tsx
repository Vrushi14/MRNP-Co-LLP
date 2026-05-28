"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const reasons = [
  {
    title: "Client-Centric Approach",
    description:
      "Dedication to putting need of clients first & providing personalized solutions.",
    icon: "/why-us1.svg",
  },
  {
    title: "Dedicated Support",
    description:
      "Availability of dedicated support & assistance from expert professionals.",
    icon: "/why-us2.svg",
  },
  {
    title: "Innovative Solutions",
    description:
      "Ability to customize service to meet the specific needs and goals of each client.",
    icon: "/why-us3.svg",
  },
  {
    title: "Transparent Communication",
    description:
      "Clear and transparent communication throughout the client engagement.",
    icon: "/why-us4.svg",
  },
];

export default function WhyUs() {
  return (
    <section className="relative w-full py-20 flex items-center overflow-hidden">
      <Image
        src="/why-us.png"
        alt=""
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        loading="lazy"
        quality={80}
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 w-full container mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-12 md:mb-16 lg:mb-20 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-instrument text-white text-sm md:text-base lg:text-2xl font-medium tracking-wider mb-4 md:mb-6"
          >
            Why Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-forum text-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 md:mb-6"
          >
            Partner in Financial Success and Growth.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-instrument max-w-2xl text-white text-sm md:text-base font-normal leading-relaxed"
          >
            We understand that choosing the right accounting partner is crucial.
            We offer unparalleled expertise in Finanacial Goals and Business
          </motion.p>
        </div>

        <motion.div 
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white py-14 px-6 md:px-8 space-y-4 shadow-sm hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16">
                <Image
                  src={reason.icon}
                  alt={reason.title}
                  width={58}
                  height={58}
                  className="w-full h-full object-contain"
                  sizes="64px"
                />
              </div>
              <h3 className="font-forum text-primaryBlue text-xl md:text-2xl">
                {reason.title}
              </h3>
              <p className="text-[#191919] text-sm md:text-base leading-relaxed font-instrument">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
