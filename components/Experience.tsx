"use client";

import React, { useLayoutEffect, useRef } from "react";

import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";
import { WordReveal } from "./ui/WordReveal";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const cards = list.querySelectorAll<HTMLElement>("[data-exp-card]");
      if (!cards.length) return;

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };

          if (reduced) {
            gsap.from(cards, {
              opacity: 0,
              duration: 0.4,
              scrollTrigger: { trigger: list, start: "top 85%", once: true },
            });
            return;
          }

          cards.forEach((card, i) => {
            // Entrada em foco: o card sobe, cresce e acende ao chegar
            // na zona de leitura
            gsap.fromTo(
              card,
              { autoAlpha: 0.15, scale: 0.93, y: 70 },
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                force3D: true,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  end: "top 55%",
                  scrub: 0.5,
                },
              }
            );

            // Saída de foco: escurece ao subir para fora da zona de leitura,
            // mantendo só o capítulo atual em destaque
            gsap.to(card, {
              autoAlpha: 0.3,
              scale: 0.95,
              force3D: true,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 20%",
                end: "top 0%",
                scrub: 0.5,
              },
            });

            // Contador do capítulo ativo ao lado do título fixo
            ScrollTrigger.create({
              trigger: card,
              start: "top 60%",
              end: "bottom 40%",
              onToggle: (self) => {
                if (self.isActive && counterRef.current) {
                  counterRef.current.textContent = String(i + 1).padStart(
                    2,
                    "0"
                  );
                }
              },
            });
          });

          // Barra de progresso da seção
          if (barRef.current) {
            gsap.fromTo(
              barRef.current,
              { scaleX: 0 },
              {
                scaleX: 1,
                transformOrigin: "left center",
                ease: "none",
                scrollTrigger: {
                  trigger: list,
                  start: "top 70%",
                  end: "bottom 45%",
                  scrub: 0.5,
                },
              }
            );
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 w-full" ref={sectionRef}>
      <div className="w-full lg:grid lg:grid-cols-[1fr_1.5fr] lg:gap-16 lg:items-start">
        {/* Título sticky: trava na tela enquanto os capítulos passam (desktop) */}
        <div className="lg:sticky lg:top-[35vh] lg:self-start">
          <WordReveal
            as="h1"
            className="heading lg:text-start"
            segments={[
              { text: "Nosso " },
              { text: "diferencial", className: "text-purple" },
            ]}
          />

          {/* Capítulo atual + progresso */}
          <div className="hidden lg:flex items-center gap-5 mt-8 pe-8">
            <span className="text-lg font-bold tabular-nums whitespace-nowrap">
              <span ref={counterRef} className="text-purple">
                01
              </span>
              <span className="text-white/40">
                {" / "}
                {String(workExperience.length).padStart(2, "0")}
              </span>
            </span>
            <div className="h-px flex-1 bg-white/10 overflow-hidden rounded-full">
              <div ref={barRef} className="h-full w-full bg-purple scale-x-0" />
            </div>
          </div>
        </div>

        <div
          ref={listRef}
          className="w-full mt-12 lg:mt-0 grid grid-cols-1 gap-10"
        >
          {workExperience.map((card, index) => (
            <div data-exp-card key={card.id} className="gpu">
              <Button
                //   random duration will be fun , I think , may be not
                duration={Math.floor(Math.random() * 10000) + 10000}
                borderRadius="1.75rem"
                style={{
                  //   add these two
                  //   you can generate the color from here https://cssgradient.io/
                  background: "rgb(4,7,29)",
                  backgroundColor:
                    "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                  // add this border radius to make it more rounded so that the moving border is more realistic
                  borderRadius: `calc(1.75rem* 0.96)`,
                }}
                // remove bg-white dark:bg-slate-900
                className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800 w-full"
              >
                <div className="relative flex lg:flex-row w-full  flex-col items-center justify-center text-center p-3 py-6 md:p-5 lg:p-10 gap-2 overflow-hidden">
                  {/* Número fantasma do capítulo */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -right-2 -top-6 text-[6rem] lg:text-[8rem] leading-none font-bold text-white/[0.05]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <img
                    src={card.thumbnail}
                    alt={card.thumbnail}
                    width={128}
                    height={128}
                    className="lg:w-32 md:w-20 w-16 h-auto"
                  />
                  <div className="lg:ms-5">
                    <h2 className="text-center md:text-start text-xl md:text-2xl font-bold">
                      {card.title}
                    </h2>
                    <p className="text-center md:text-start text-white-100 mt-3 font-semibold">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
