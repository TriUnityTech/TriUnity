"use client";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { navItems, CHECKUP_LINK } from "@/data";

import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Checkup from "@/components/Checkup";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

const Home = () => {
  return (
    <main className=" relative bg-zinc-950 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full h-full ">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Manifesto />
        <Checkup />
        <Services />
        <RecentProjects />
        <Clients />
        <Experience />
        <Footer />
      </div>
      <a
        href={CHECKUP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <WhatsAppIcon fontSize="large" />
      </a>
    </main>
  );
};

export default Home;
