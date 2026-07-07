"use client";

import React, { useLayoutEffect, useRef } from "react";
import { useLenis } from "@studio-freight/react-lenis";

import { testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";
import { ScrollReveal } from "./ui/ScrollReveal";
import { WordReveal } from "./ui/WordReveal";
import { gsap } from "@/lib/gsap";

const Clients = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const skewTo = useRef<((value: number) => void) | null>(null);

  useLayoutEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    skewTo.current = gsap.quickTo(el, "skewX", {
      duration: 0.5,
      ease: "power3.out",
    });

    return () => {
      skewTo.current = null;
      gsap.set(el, { skewX: 0 });
    };
  }, []);

  // Skew sutil proporcional à velocidade do scroll: o marquee "verga" quando
  // o usuário rola rápido e volta ao normal quando para (fluidez premium)
  useLenis((lenis) => {
    // `velocity` existe no runtime mas não está no .d.ts desta versão do Lenis
    const velocity = (lenis as unknown as { velocity?: number }).velocity ?? 0;
    skewTo.current?.(gsap.utils.clamp(-5, 5, velocity * 0.3));
  });

  return (
    <section id="testimonials" className="py-20">
      <WordReveal
        as="h1"
        className="heading"
        segments={[
          { text: "Feedback " },
          { text: "de alguns clientes", className: "text-purple" },
        ]}
      />

      <ScrollReveal y={48} scale={0.97} className="flex flex-col items-center max-lg:mt-10">
        <div
          ref={marqueeRef}
          // remove bg-white dark:bg-black dark:bg-grid-white/[0.05], h-[40rem] to 30rem , md:h-[30rem] are for the responsive design
          className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden gpu"
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Clients;
