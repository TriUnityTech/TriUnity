"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const MANIFESTO =
  "Cuidamos de cada camada da tecnologia que move o seu negócio — da infraestrutura à experiência de quem usa. Fluidez, segurança e resultado, do começo ao fim.";

// Palavras que recebem o destaque roxo quando acendem
const HIGHLIGHTS = new Set(["Fluidez,", "segurança", "resultado,"]);

/**
 * Statement estilo Apple: a seção trava na tela e as palavras "acendem"
 * uma a uma, no ritmo exato do scroll.
 */
const Manifesto = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const words = section.querySelectorAll("[data-manifesto-word]");
      if (!words.length) return;

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          desktop:
            "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
          mobile:
            "(prefers-reduced-motion: no-preference) and (max-width: 1023px)",
        },
        (context) => {
          const { reduced } = context.conditions as {
            reduced: boolean;
          };

          if (reduced) {
            gsap.set(words, { opacity: 1 });
            return;
          }

          gsap.to(words, {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            // Cena pinada em todas as larguras (mesma do desktop no mobile)
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=130%",
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
            },
          });
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Manifesto"
      className="flex items-center justify-center py-28 lg:py-0 lg:min-h-screen"
    >
      <p
        aria-label={MANIFESTO}
        className="max-w-5xl mx-auto text-center font-semibold tracking-tight leading-snug text-3xl md:text-5xl lg:text-6xl"
      >
        {MANIFESTO.split(" ").map((word, i) => (
          <span
            key={i}
            data-manifesto-word
            aria-hidden="true"
            className={
              HIGHLIGHTS.has(word)
                ? "text-purple opacity-20"
                : "text-white opacity-20"
            }
          >
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
};

export default Manifesto;
