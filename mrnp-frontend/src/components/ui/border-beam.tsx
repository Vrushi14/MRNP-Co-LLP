"use client";
import { motion } from "framer-motion";

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#38bdf8",
  colorTo = "#3b82f6",
  delay = 0,
}: {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": delay,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] 
      ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)] ${className}`}
    >
      <motion.div
        className="absolute [background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]"
        style={{
          width: "var(--size)px",
          height: "var(--border-width)px",
          offsetPath: `rect(0 auto auto 0 round calc(var(--size)*1px))`,
          offsetDistance: "0%",
        }}
        animate={{
          offsetDistance: "100%",
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: duration,
          delay: delay,
        }}
      />
    </div>
  );
};
