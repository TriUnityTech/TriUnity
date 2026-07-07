"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface Segment {
  text: string;
  className?: string;
}

interface WordRevealProps {
  /** Trechos do título; cada um pode ter classe própria (ex.: text-purple) */
  segments: Segment[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}

/**
 * Título estilo Apple: cada palavra sobe de dentro de uma máscara
 * (overflow hidden) quando a seção entra na tela.
 */
export const WordReveal = ({
  segments,
  as = "h1",
  className,
}: WordRevealProps) => {
  const Tag = as as React.ElementType;
  const ref = useRef<HTMLElement>(null);
  const fullText = segments.map((s) => s.text).join("");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const words = el.querySelectorAll("[data-word]");
      if (!words.length) return;

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };

          if (reduced) {
            gsap.from(el, {
              opacity: 0,
              duration: 0.4,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });
            return;
          }

          gsap.from(words, {
            yPercent: 120,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={cn(className)} aria-label={fullText}>
      {segments.map((segment, sIdx) => (
        <React.Fragment key={sIdx}>
          {segment.text
            .split(" ")
            .filter(Boolean)
            .map((word, wIdx) => (
              // espaço real fora da máscara: mantém o texto legível no DOM
              // (SEO/copiar-colar) sem vazar na animação
              <React.Fragment key={`${sIdx}-${wIdx}`}>
                <span
                  aria-hidden="true"
                  className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
                >
                  <span
                    data-word
                    className={cn(
                      "inline-block will-change-transform",
                      segment.className
                    )}
                  >
                    {word}
                  </span>
                </span>{" "}
              </React.Fragment>
            ))}
        </React.Fragment>
      ))}
    </Tag>
  );
};
