"use client";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useLenis } from "@studio-freight/react-lenis";

import MagicButton from "./MagicButton";
import { Magnetic } from "./ui/Magnetic";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { CHECKUP_LINK } from "@/data";

const Hero = () => {
  const lenis = useLenis();

  return (
    <header
      className="relative pb-20 pt-36 lg:min-h-[90vh] lg:flex lg:flex-col lg:justify-center"
      aria-label="Introdução"
    >
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full opacity-50"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw] opacity-50" fill="blue" />
      </div>

      <div
        className="h-screen w-full dark:bg-zinc-950 bg-white dark:bg-grid-white/[0.015] bg-grid-zinc-950/[0.05]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-zinc-950
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-10 z-10">
        <div
          className="max-w-[89vw] md:max-w-2xl lg:max-w-[70vw] flex flex-col items-center justify-center gpu"
        >
          <img
            src="./logo tri horizontal.png"
            alt="Logo TriUnity Horizontal"
            width={3000}
            height={786}
            className="w-60 sm:w-72 h-auto mb-8 opacity-90 transition-opacity duration-500 hover:opacity-100"
          />

          <h1 className="sr-only">TriUnity - TI para clínicas e empresas de Pitangui e região</h1>

          <TextGenerateEffect
            words="TI para clínicas e empresas de Pitangui e região"
            className="text-center text-[40px] md:text-5xl lg:text-6xl tracking-tight font-medium"
          />

          <p className="text-center tracking-tight mb-8 text-zinc-400 text-sm md:text-lg lg:text-xl max-w-xl mt-4">
            Sistema lento? Internet caindo? Backup que ninguém testou? A gente resolve — atendimento local, no mesmo dia.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Magnetic>
              <a
                href={CHECKUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agendar checkup gratuito pelo WhatsApp"
              >
                <MagicButton
                  title="Agende seu checkup gratuito"
                  icon={<WhatsAppIcon />}
                  position="right"
                />
              </a>
            </Magnetic>
            <a
              href="#about"
              className="text-zinc-400 hover:text-white text-sm underline-offset-4 hover:underline"
              onClick={(e) => {
                if (lenis) {
                  e.preventDefault();
                  lenis.scrollTo("#about", { offset: -80, duration: 1.6 });
                }
              }}
            >
              Ver serviços
            </a>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Hero;
