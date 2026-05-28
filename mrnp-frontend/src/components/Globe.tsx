"use client";
import React from "react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("./ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function GlobeDisplay({ activeLocation }: { activeLocation?: string }) {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: false,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255, 255, 255, 0.4)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
    opacity: 0,
  };
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const sampleArcs = [
    {
      order: 1,
      startLat: 19.076,
      startLng: 72.8777, // India
      endLat: 51.5074,
      endLng: -0.1278, // London
      arcAlt: 0.2,
      color: colors[0],
    },
    {
      order: 2,
      startLat: 51.5074,
      startLng: -0.1278, // London
      endLat: 25.7617,
      endLng: -80.1918, // Florida
      arcAlt: 0.3,
      color: colors[1],
    },
    {
      order: 3,
      startLat: 25.7617,
      startLng: -80.1918, // Florida
      endLat: 19.3133,
      endLng: -81.2546, // Cayman
      arcAlt: 0.1,
      color: colors[2],
    },
    {
      order: 4,
      startLat: 19.076,
      startLng: 72.8777, // India
      endLat: 25.2048,
      endLng: 55.2708, // Dubai
      arcAlt: 0.1,
      color: colors[0],
    },
    {
      order: 5,
      startLat: 25.2048,
      startLng: 55.2708, // Dubai
      endLat: 22.3193,
      endLng: 114.1694, // Hong Kong
      arcAlt: 0.2,
      color: colors[1],
    },
    {
      order: 6,
      startLat: 22.3193,
      startLng: 114.1694, // Hong Kong
      endLat: 35.1264,
      endLng: 33.4299, // Cyprus
      arcAlt: 0.3,
      color: colors[2],
    },
    {
      order: 7,
      startLat: 35.1264,
      startLng: 33.4299, // Cyprus
      endLat: 51.5074,
      endLng: -0.1278, // London
      arcAlt: 0.2,
      color: colors[0],
    },
  ];

  // Map LOCATIONS for labels
  const LOCATIONS = [
    { name: "India", lat: 19.076, lng: 72.8777 },
    { name: "London", lat: 51.5074, lng: -0.1278 },
    { name: "Florida", lat: 25.7617, lng: -80.1918 },
    { name: "Cayman", lat: 19.3133, lng: -81.2546 },
    { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
    { name: "Dubai", lat: 25.2048, lng: 55.2708 },
    { name: "Cyprus", lat: 35.1264, lng: 33.4299 },
  ];

  return (
    <div className="flex flex-row items-center justify-center h-full w-full">
      <div className="w-full h-full relative overflow-hidden">
        <div className="absolute w-full h-full z-10">
          <World 
            data={sampleArcs} 
            globeConfig={globeConfig} 
            activeLocation={activeLocation} 
            locations={LOCATIONS} 
          />
        </div>
      </div>
    </div>
  );
}

