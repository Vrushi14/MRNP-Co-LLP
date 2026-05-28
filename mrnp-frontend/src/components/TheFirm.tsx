"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import Image from "next/image";

export default function TheFirm() {
  return (
    <section className="relative w-full min-h-screen flex justify-center items-center overflow-hidden">
      <Image
        src="/the-firm-bg.png"
        alt=""
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        loading="lazy"
        quality={80}
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-start justify-center gap-12 md:gap-16 lg:gap-20">
          <div className="flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="font-forum text-white text-[150px] md:text-[180px] lg:text-[257px] leading-none text-center mb-6">
                <CountUp end={15} duration={2.5} enableScrollSpy scrollSpyOnce />
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-forum text-3xl text-center text-white leading-7"
            >
              Years of Experience
            </motion.p>
          </div>

          <motion.div 
            className="space-y-4 md:space-y-5 lg:space-y-6 text-white max-w-2xl"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
              }}
              className="font-instrument text-xs md:text-sm lg:text-2xl uppercase tracking-widest"
            >
              The Firm
            </motion.p>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
              }}
              className="font-forum text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight"
            >
              Building Financial Confidence. Driving Growth.
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
              }}
              className="font-instrument text-sm md:text-base lg:text-lg leading-relaxed text-white"
            >
              MRNP & Co. LLP is a full-service Chartered Accountant firm with an
              established presence across India—operating from Bangalore,
              Ahmedabad, Surat, Vadodara, Raipur, Gandhidham, and Bhuj. Since
              our founding in 2011, we have brought together a team of sharp,
              forward-thinking professionals whose expertise spans leading
              consulting firms—delivering that depth of knowledge directly to
              every client we serve
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
