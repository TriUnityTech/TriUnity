"use client";

import { useLayoutEffect, useRef } from "react";
import { FaLocationArrow, FaChevronDown } from "react-icons/fa6";
import { useLenis } from "@studio-freight/react-lenis";

import MagicButton from "./MagicButton";
import { Magnetic } from "./ui/Magnetic";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { gsap } from "@/lib/gsap";

const Hero = () => {
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useLayoutEffect(() => {
    const header = headerRef.current;
    const content = contentRef.current;
    if (!header || !content) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: cena pinada com zoom-through — a tela trava e o conteúdo
      // cresce em direção à câmera até "atravessar", revelando a próxima seção
      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
        () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: header,
              start: "top top",
              end: "+=120%",
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
            },
          });

          tl.to(
            content,
            { scale: 1.5, yPercent: -6, force3D: true, duration: 1, ease: "power1.in" },
            0
          ).to(content, { autoAlpha: 0, duration: 0.45, ease: "none" }, 0.55);

          // A dica de scroll some assim que a rolagem começa
          if (cueRef.current) {
            tl.to(cueRef.current, { autoAlpha: 0, duration: 0.15 }, 0);
          }
        }
      );

      // Mobile: "afundar" leve, sem pin
      mm.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 1023px)",
        () => {
          gsap.to(content, {
            opacity: 0.25,
            scale: 0.94,
            force3D: true,
            ease: "none",
            scrollTrigger: {
              trigger: header,
              start: "center center",
              end: "bottom 25%",
              scrub: 0.6,
            },
          });
        }
      );
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <header
      className="relative pb-32 pt-40 lg:pb-0 lg:pt-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center"
      aria-label="Introdução"
      ref={headerRef}
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
          ref={contentRef}
          className="max-w-[89vw] md:max-w-2xl lg:max-w-[70vw] flex flex-col items-center justify-center gpu"
        >
          <img
            src="./logo tri horizontal.png"
            alt="Logo TriUnity Horizontal"
            width={3000}
            height={786}
            className="w-60 sm:w-72 h-auto mb-8 opacity-90 transition-opacity duration-500 hover:opacity-100"
          />

          <h1 className="sr-only">TriUnity - Tecnologia de ponta para o seu negócio</h1>

          <TextGenerateEffect
            words="Desenvolvemos Tecnologia de ponta para o seu negócio!"
            className="text-center text-[40px] md:text-5xl lg:text-6xl tracking-tight font-medium"
          />

          <p className="text-center tracking-tight mb-8 text-zinc-400 text-sm md:text-lg lg:text-xl max-w-xl mt-4">
            Transforme ideias em soluções práticas e inovadoras.
          </p>

          <Magnetic>
            <a
              href="#about"
              aria-label="Ver Nossos Serviços"
              onClick={(e) => {
                if (lenis) {
                  e.preventDefault();
                  lenis.scrollTo("#about", { offset: -80, duration: 1.6 });
                }
              }}
            >
              <MagicButton
                title="Nossos serviços"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Dica de scroll: some assim que a rolagem começa */}
      <div
        ref={cueRef}
        aria-hidden="true"
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-zinc-500"
      >
        <span className="text-xs tracking-widest uppercase">Role</span>
        <FaChevronDown className="animate-bounce w-4 h-4" />
      </div>
    </header>
  );
};

export default Hero;
