"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BorderBeam } from "./ui/border-beam";

const services = [
  {
    title: "Audit & Assurance Services",
    slug: "audit-and-assurance",
    description:
      "Utilizing Advanced Methods for Efficient Audits and Value-Added Client Services.",
    icon: "/services/Vector1.svg",
  },
  {
    title: "Business Consultancy & Advisory",
    slug: "Business-Consultancy-and-Advisory",
    description: "Providing Expert Guidance for Business Growth and Success.",
    icon: "/services/Vector2.svg",
  },
  {
    title: "Changes in Accounting Standards & Legislations",
    slug: "Changes-in-Accounting-Standards-and-Legislations",
    description: "Staying Ahead of Regulatory Changes and Updates.",
    icon: "/services/Vector3.svg",
  },
  {
    title: "Governance & Risk Management",
    slug: "Governance-and-Risk-Management",
    description: "Helping Organizations Manage Risk and Improve Governance.",
    icon: "/services/Vector4.svg",
  },
  {
    title: "Management Recommendations",
    slug: "management-recommendations",
    description: "Providing Actionable Insights for Business Improvement.",
    icon: "/services/Vector5.svg",
  },
  {
    title: "Tax Consultancy",
    slug: "Tax-Consultancy",
    description:
      "Expert Tax Consultancy Services for Individuals and Businesses.",
    icon: "/services/Vector6.svg",
  },
];

export default function Services() {
  return (
    <section className="relative w-full bg-[#F2F5F1] py-16 lg:py-24 overflow-hidden">
      {/* Top and Bottom Edge Glows */}
      <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-blue-200/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-blue-200/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-instrument mb-4 text-sm font-medium tracking-wider text-[#061143] lg:text-2xl"
            >
              Our Services
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-forum text-4xl leading-tight text-primaryBlue lg:text-5xl"
            >
              Expert Advice, Built for Your Business
            </motion.h2>
          </div>
          <div className="flex-1 lg:pl-12">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-instrument text-base text-[#191919] lg:text-lg"
            >
              Our foundation is carefully crafted. Recognizing the advantages of
              an ideal scale, we operate as a specialized wealth management
              firm, offering extensive solutions while prioritizing personalized
              client experiences
            </motion.p>
          </div>
        </div>

        <motion.div 
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mx-auto grid grid-cols-1 lg:grid-cols-2 border-t border-gray-300"
        >
          <BorderBeam size={400} duration={12} delay={0} colorFrom="#38bdf8" colorTo="#3b82f6" />
          {services.map((service) => (
            <motion.div
              key={service.slug}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              whileHover={{ y: -4, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
              className="group relative flex border-b border-gray-300 bg-transparent transition-colors duration-500"
            >
              <div className="flex flex-1 flex-col p-8 lg:px-12 lg:py-16">
                <div className="mb-6">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                    sizes="64px"
                  />
                </div>
                <h3 className="font-instrument mb-4 text-2xl font-medium text-primaryBlue lg:text-3xl">
                  {service.title}
                </h3>
                <p className="font-instrument mb-6 text-lg text-[#191919]">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <Link
                    className="font-instrument inline-flex items-center gap-2 rounded-full border-2 border-primaryBlue px-8 py-3 text-base font-medium text-primaryBlue transition-all hover:bg-primaryBlue hover:text-white"
                    href={`/services/${service.slug}`}
                  >
                    Learn More
                    <svg className="w-4 h-4 transition-transform duration-250 ease-out group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
