"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex justify-center items-center min-h-screen overflow-hidden">
      {/* Background image via Next.js Image for optimization + preload */}
      <Image
        src="/mrnp-hero-bg.svg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="container w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-0">
        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-6 mt-10 md:py-40">
          <h1 className="font-forum text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] md:leading-tight lg:leading-[5rem] xl:leading-[6.5rem] pb-2">
            <span className="block animate-fade-in-up bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              History of expertise.
            </span>
            <span className="block animate-fade-in-up animation-delay-150 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Reputation for excellence.
            </span>
          </h1>
          <p className="font-instrument text-base md:text-lg lg:text-xl xl:text-2xl text-white max-w-5xl mx-auto whitespace-pre-line leading-relaxed animate-fade-in-up animation-delay-200">
            Smart approaches to solution with exceptional service. Talent and
            expertise necessary to meet our clients&apos; needs in an ever-changing
            and fast-paced environment.
          </p>
          <div className="pt-14 animate-fade-in-up animation-delay-400">
            <Link
              href="/about"
              className="font-instrument px-10 py-4 bg-[#2A3F76] text-white text-sm lg:text-[1rem] xl:text-[1.25rem] font-bold rounded-full hover:bg-primaryBlue/90 transition-all duration-300"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

