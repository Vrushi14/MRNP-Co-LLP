"use client";

import dynamic from "next/dynamic";

export const TheFirm    = dynamic(() => import("@/components/TheFirm"),    { ssr: false });
export const Services   = dynamic(() => import("@/components/Services"),   { ssr: false });
export const Locations  = dynamic(() => import("@/components/Locations"),  { ssr: false });
export const WhyUs      = dynamic(() => import("@/components/WhyUs"),      { ssr: false });
export const HereToHelp = dynamic(() => import("@/components/HereToHelp"), { ssr: false });
export const Footer     = dynamic(() => import("@/components/Footer"),     { ssr: false });
