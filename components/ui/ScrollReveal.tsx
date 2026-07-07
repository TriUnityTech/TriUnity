"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Seletor dos filhos a animar em stagger; por padrão anima o container inteiro */
  targets?: string;
  y?: number;
  scale?: number;
  stagger?: number;
  /** Liga a animação ao progresso do scroll (estilo Apple) em vez de disparo único */
  scrub?: boolean;
  /** Ponto de início do ScrollTrigger (default: "top 85%") */
  start?: string;
  /** Ponto de fim quando scrub=true (default: "top 40%") */
  end?: string;
}

export const ScrollReveal = ({
  children,
  className,
  targets,
  y = 48,
  scale = 1,
  stagger = 0.12,
  scrub = false,
  start = "top 85%",
  end = "top 40%",
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const elements: gsap.TweenTarget = targets
        ? el.querySelectorAll(targets)
        : el;

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          desktop: "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
          mobile: "(prefers-reduced-motion: no-preference) and (max-width: 1023px)",
        },
        (context) => {
          const { reduced, desktop } = context.conditions as {
            reduced: boolean;
            desktop: boolean;
            mobile: boolean;
          };

          if (reduced) {
            // Sem movimento: apenas um fade curto disparado uma vez
            gsap.from(elements, {
              opacity: 0,
              duration: 0.4,
              scrollTrigger: { trigger: el, start, once: true },
            });
            return;
          }

          gsap.from(elements, {
            opacity: 0,
            y,
            scale,
            force3D: true,
            stagger: desktop ? stagger : stagger * 0.5,
            // scrub amarra ao scroll apenas no desktop; mobile usa disparo único
            ...(scrub && desktop
              ? {
                  ease: "none",
                  scrollTrigger: { trigger: el, start, end, scrub: 0.6 },
                }
              : {
                  duration: 0.9,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: el,
                    start,
                    toggleActions: "play none none reverse",
                  },
                }),
          });
        }
      );
    }, el);

    return () => ctx.revert();
  }, [targets, y, scale, stagger, scrub, start, end]);

  return (
    <div ref={ref} className={cn("gpu", className)}>
      {children}
    </div>
  );
};
