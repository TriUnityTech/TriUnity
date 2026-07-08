"use client";

import React, { useLayoutEffect, useRef } from "react";
import ServiceCard from "./ui/ServiceCard";
import { WordReveal } from "./ui/WordReveal";
import { gsap } from "@/lib/gsap";

const services = [
  {
    title: "Criação de métricas KPI",
    bgImage: "/S3.avif",
  },
  {
    title: "Estruturação de BI",
    bgImage: "/S4.avif",
  },
  {
    title: "Automação de Rotinas Administrativas",
    bgImage: "/S1.avif",
  },
  {
    title: "Criação de relatórios e dashboards automatizados",
    bgImage: "/S2.avif",
  },
];

const CARD_OFFSET = 26;
const CARD_SCALE_STEP = 0.05;

const Approach: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const cards = Array.from(
        stage.querySelectorAll<HTMLElement>("[data-deck-card]")
      );
      if (!cards.length) return;

      // Deck de cards — a seção trava e cada card "descola" do topo da pilha
      // revelando o próximo, no ritmo do scroll. Estilo aplicado via gsap.set
      // para o layout em grid continuar valendo sem JS/reduced-motion.
      // Roda em todas as larguras: mesma experiência no desktop e no mobile.
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(stage, {
            display: "block",
            position: "relative",
            height: "60vh",
          });
          gsap.set(cards, {
            position: "absolute",
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            width: "min(100%, 680px)",
            transformOrigin: "center top",
          });
          cards.forEach((card, i) => {
            gsap.set(card, {
              y: i * CARD_OFFSET,
              scale: 1 - i * CARD_SCALE_STEP,
              zIndex: cards.length - i,
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 8%",
              end: "+=" + cards.length * 80 + "%",
              pin: true,
              scrub: 0.9,
              anticipatePin: 1,
            },
          });

          for (let i = 0; i < cards.length - 1; i++) {
            // card do topo descola e sai voando para cima
            tl.to(
              cards[i],
              {
                y: "-=560",
                rotation: i % 2 ? 5 : -5,
                autoAlpha: 0,
                force3D: true,
                duration: 1,
                ease: "power2.inOut",
              },
              i
            );
            // os restantes sobem uma posição na pilha
            for (let j = i + 1; j < cards.length; j++) {
              tl.to(
                cards[j],
                {
                  y: (j - i - 1) * CARD_OFFSET,
                  scale: 1 - (j - i - 1) * CARD_SCALE_STEP,
                  duration: 1,
                  ease: "power2.inOut",
                },
                i
              );
            }
          }
          // respiro no final com o último card em foco
          tl.to({}, { duration: 0.5 });
        }
      );

      // Reduced-motion: grid normal com fade simples, sem movimento
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from(cards, {
          autoAlpha: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: stage,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-20" ref={sectionRef}>
      <WordReveal
        as="h1"
        className="heading"
        segments={[
          { text: "Serviços de " },
          { text: "BI e Automação", className: "text-purple" },
        ]}
      />
      <div
        ref={stageRef}
        className="services gap-5 grid mt-9 sm:text-2xl font-bold sm:grid-cols-2 items-center justify-center"
      >
        {services.map((service, index) => (
          <div data-deck-card key={index} className="gpu">
            <ServiceCard title={service.title} bgImage={service.bgImage} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Approach;
