"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const Globe = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-blue-900/30 animate-pulse" />
    </div>
  ),
});

import Image from "next/image";

const locations = [
  "India",
  "London",
  "Florida",
  "Cayman",
  "Hong Kong",
  "Dubai",
  "Cyprus",
];

export default function Locations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [globeVisible, setGlobeVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Only import Three.js Globe when section is 200px away from viewport and NOT on mobile
  useEffect(() => {
    if (isMobile) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGlobeVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="relative bg-[#000B1E] py-20 overflow-hidden">
      {/* Top and Bottom Horizontal Glows */}
      <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 z-10"
          >
            <div>
              <h2 className="font-forum text-4xl md:text-5xl font-bold text-white mb-4">
                Our Locations
              </h2>
              <p className="font-instrument text-white text-lg">
                Strategic locations for optimal global reach.
              </p>
            </div>
            <div className="space-y-4">
              {locations.map((location, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={location}
                  onClick={() => setActiveIndex(idx)}
                  className={`font-instrument text-2xl md:text-3xl font-light pb-4 border-b transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? "text-blue-400 border-blue-400"
                      : "text-white border-white hover:text-blue-400 hover:border-blue-400"
                  }`}
                >
                  {location}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] w-full"
          >
            <div className="absolute w-full h-full">
              {isMobile ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Image 
                    src="/globe.png" 
                    alt="Globe" 
                    width={500} 
                    height={500} 
                    className="object-contain opacity-60 animate-float"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              ) : globeVisible ? (
                <Globe activeLocation={locations[activeIndex]} />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-blue-900/30 animate-pulse" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
