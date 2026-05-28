import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { TheFirm, Services, Locations, WhyUs, HereToHelp, Footer } from "@/components/LazyComponents";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <TheFirm />
      <Services />
      <Locations />
      <WhyUs />
      <HereToHelp />
      <Footer />
    </main>
  );
}





