"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, LayoutGroup } from "framer-motion";
import { servicesData } from "@/data/services";

const ORDERED_SLUGS = [
  "audit-and-assurance",
  "Business-Consultancy-and-Advisory",
  "Changes-in-Accounting-Standards-and-Legislations",
  "Governance-and-Risk-Management",
  "management-recommendations",
  "Tax-Consultancy"
];

const sortServices = (list: any[]) => {
  return [...list].sort((a, b) => {
    const indexA = ORDERED_SLUGS.findIndex(slug => slug.toLowerCase() === a.slug?.toLowerCase());
    const indexB = ORDERED_SLUGS.findIndex(slug => slug.toLowerCase() === b.slug?.toLowerCase());
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });
};

export function ServiceSidebar({ currentSlug }: { currentSlug: string }) {
  const [services, setServices] = useState<any[]>(() => sortServices(servicesData));

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/services`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.services && data.services.length > 0) {
            setServices(sortServices(data.services));
          }
        }
      } catch (err) {
        console.warn("Failed to fetch services in Sidebar:", err);
      }
    };
    fetchServices();
  }, []);

  return (
    <LayoutGroup>
      <nav className="flex flex-col border border-slate-200 shadow-sm bg-white">
        {services.map((s) => {
          const isActive = s.slug === currentSlug;
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className={`block px-6 py-3.5 font-instrument text-sm md:text-base border-b border-slate-200 last:border-b-0 transition-colors duration-150 ${
                isActive 
                  ? "bg-primaryBlue text-white font-medium" 
                  : "bg-white text-primaryBlue hover:bg-slate-50"
              }`}
            >
              {s.title}
            </Link>
          );
        })}
      </nav>
    </LayoutGroup>
  );
}

export function AnimatedSection({
  heading,
  description,
  body,
}: {
  heading?: string;
  description?: string;
  body: string | string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      className="mb-10"
    >
      {heading && (
        <h3 className="font-forum text-2xl md:text-3xl text-[#061143] mb-5">
          {heading}
        </h3>
      )}
      {description && (
        <p className="font-instrument text-[#191919] text-base md:text-lg leading-relaxed mb-6">
          {description}
        </p>
      )}
      {Array.isArray(body) ? (
        <motion.ul
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4 font-instrument text-[#191919] text-base md:text-lg leading-relaxed list-disc pl-5"
        >
          {body.map((item, idx) => {
            const colonIndex = item.indexOf(":");
            return (
              <motion.li
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
              >
                {colonIndex !== -1 ? (
                  <>
                    <span className="font-bold">{item.slice(0, colonIndex + 1)}</span>
                    {item.slice(colonIndex + 1)}
                  </>
                ) : (
                  item
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      ) : (
        <p className="font-instrument text-[#191919] text-base md:text-lg leading-relaxed whitespace-pre-wrap">
          {body}
        </p>
      )}
    </motion.div>
  );
}

export function AnimatedImage({ src, alt }: { src: string; alt: string }) {
  if (!src) return null;
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      className="relative w-full aspect-[16/9] mb-10 overflow-hidden bg-gray-100"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
        priority
      />
    </motion.div>
  );
}
