"use client";

import { useLayoutEffect, useRef } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";
import { WordReveal } from "./ui/WordReveal";
import { gsap } from "@/lib/gsap";

const Projects = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: galeria horizontal dirigida pelo scroll vertical — a seção
      // trava na tela e os projetos deslizam lateralmente (assinatura Apple).
      // Todo o estilo da variante é aplicado via gsap.set para que, sem JS ou
      // com prefers-reduced-motion, o layout continue no fluxo normal.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
        () => {
          gsap.set(viewport, {
            height: "100vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          });
          gsap.set(track, {
            flexWrap: "nowrap",
            width: "max-content",
            justifyContent: "flex-start",
            margin: 0,
            paddingLeft: "6vw",
            paddingRight: "14vw",
          });

          const distance = () =>
            Math.max(0, track.scrollWidth - viewport.clientWidth);

          // Poucos projetos: se não há percurso horizontal, dispensa a
          // galeria pinada e usa a entrada simples
          if (distance() < 80) {
            gsap.set(viewport, { clearProps: "all" });
            gsap.set(track, { clearProps: "all" });
            gsap.from(track.querySelectorAll("[data-project-card]"), {
              autoAlpha: 0,
              y: 64,
              scale: 0.96,
              force3D: true,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: track,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
            return;
          }

          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: viewport,
              start: "top top",
              end: () => "+=" + (distance() + viewport.clientWidth * 0.35),
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      );

      // Mobile / reduced-motion: entrada simples em pilha
      mm.add(
        {
          mobile:
            "(prefers-reduced-motion: no-preference) and (max-width: 1023px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };
          const cards = track.querySelectorAll("[data-project-card]");

          gsap.from(cards, {
            autoAlpha: 0,
            ...(reduced ? {} : { y: 48 }),
            duration: reduced ? 0.4 : 0.9,
            ease: "power3.out",
            stagger: reduced ? 0 : 0.12,
            scrollTrigger: {
              trigger: track,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      );
    }, viewport);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="py-20">
      <WordReveal
        as="h1"
        className="heading"
        segments={[
          { text: "Alguns de " },
          { text: "nossos trabalhos recentes", className: "text-purple" },
        ]}
      />
      <div ref={viewportRef}>
        <div
          ref={trackRef}
          className="flex flex-wrap items-center justify-center p-4 gap-28 md:gap-y-60 my-14 sm:mt-32 gpu"
        >
          {projects.map((item) => {
            const cardClass =
              "card h-auto  flex items-center justify-center sm:w-96 w-[80vw] gpu";

            const cardContent = (
              <PinContainer
                title={item.link ?? item.title}
                href={item.link}
              >
                <div className="relative h-auto flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden mb-10">
                  <div className="sm:max-h-52 h-48 w-full"></div>
                  <img
                    src={item.img}
                    alt="cover"
                    className={
                      item.isLogo
                        ? "z-10 absolute inset-0 m-auto h-36 w-36 object-contain rounded-2xl"
                        : "z-10 absolute bottom-0"
                    }
                  />
                </div>

                <h2 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {item.title}
                </h2>

                <p
                  className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                  style={{
                    color: "#BEC1DD",
                    margin: "1vh 0",
                  }}
                >
                  {item.des}
                </p>

                {(item.iconLists.length > 0 || item.link) && (
                  <div className="flex items-center justify-between mt-7 mb-3">
                    <div className="flex items-center">
                      {item.iconLists.map((icon, index) => (
                        <div
                          key={index}
                          className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                          style={{
                            transform: `translateX(-${5 * index + 2}px)`,
                          }}
                        >
                          <img src={icon} alt="icon" className="p-2" />
                        </div>
                      ))}
                    </div>

                    {item.link && (
                      <div className="flex justify-center items-center">
                        <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                          Ver projeto
                        </p>
                        <FaLocationArrow className="ms-3" color="#CBACF9" />
                      </div>
                    )}
                  </div>
                )}
              </PinContainer>
            );

            return item.link ? (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                data-project-card
                className={cardClass}
              >
                {cardContent}
              </a>
            ) : (
              <div key={item.id} data-project-card className={cardClass}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
