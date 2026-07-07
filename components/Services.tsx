"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { IoCopyOutline } from "react-icons/io5";
import {
  FaServer,
  FaHeadset,
  FaWifi,
  FaNetworkWired,
  FaTowerBroadcast,
  FaUserGear,
  FaLaptop,
  FaCode,
} from "react-icons/fa6";

import { services, type ServiceIcon } from "@/data";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";

import { BackgroundGradientAnimation } from "./ui/GradientBg";
import { ScrollReveal } from "./ui/ScrollReveal";
import { WordReveal } from "./ui/WordReveal";
import MagicButton from "./MagicButton";
import animationData from "@/data/confetti.json";

// react-lottie acessa `document` no import — só pode carregar no client
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

const icons: Record<ServiceIcon, React.ComponentType<{ className?: string }>> =
  {
    server: FaServer,
    headset: FaHeadset,
    wifi: FaWifi,
    network: FaNetworkWired,
    broadcast: FaTowerBroadcast,
    consulting: FaUserGear,
    laptop: FaLaptop,
    code: FaCode,
  };

/** Spotlight que segue o cursor dentro do card (hover, desktop) */
const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  card.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

const cardBaseClass =
  "group relative overflow-hidden rounded-3xl border border-white/10 p-6 lg:p-8 flex flex-col justify-end min-h-[220px] transition-colors duration-500 hover:border-purple/50 gpu";

const cardBackground = {
  background: "rgb(4,7,29)",
  backgroundImage:
    "linear-gradient(135deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
};

const Services = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const lottieOptions = {
    loop: copied,
    autoplay: copied,
    animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("contato@triunitytech.com.br");
    setCopied(true);
  };

  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const cards = el.querySelectorAll<HTMLElement>("[data-service-card]");
      if (!cards.length) return;

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          desktop:
            "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
          mobile:
            "(prefers-reduced-motion: no-preference) and (max-width: 1023px)",
        },
        (context) => {
          const { reduced, desktop } = context.conditions as {
            reduced: boolean;
            desktop: boolean;
          };

          if (reduced) {
            gsap.from(cards, {
              opacity: 0,
              duration: 0.4,
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            });
            return;
          }

          if (desktop) {
            // Montagem por card: cada peça chega de uma direção e se encaixa
            // conforme entra na tela. Sem pin — o conteúdo nunca fica refém
            // de uma cena para se tornar visível.
            cards.forEach((card, i) => {
              const dir = i % 2 === 0 ? -1 : 1;
              gsap.from(card, {
                x: dir * (60 + ((i * 53) % 90)),
                y: 110 + ((i * 97) % 120),
                rotation: dir * (3 + ((i * 37) % 5)),
                scale: 0.9,
                autoAlpha: 0,
                force3D: true,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top 96%",
                  end: "top 60%",
                  scrub: 0.6,
                },
              });

              // Ken Burns: a foto de fundo assenta lentamente (profundidade)
              const photo = card.querySelector("[data-card-photo]");
              if (photo) {
                gsap.fromTo(
                  photo,
                  { scale: 1.18 },
                  {
                    scale: 1.02,
                    force3D: true,
                    ease: "none",
                    scrollTrigger: {
                      trigger: card,
                      start: "top 95%",
                      end: "bottom 35%",
                      scrub: 0.6,
                    },
                  }
                );
              }
            });
          } else {
            gsap.from(cards, {
              autoAlpha: 0,
              y: 40,
              force3D: true,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-20">
      <WordReveal
        as="h1"
        className="heading"
        segments={[
          { text: "Nossos " },
          { text: "serviços", className: "text-purple" },
        ]}
      />
      <ScrollReveal y={24}>
        <p className="text-center text-[#C1C2D3] mt-4 max-w-2xl mx-auto">
          Da infraestrutura ao suporte do dia a dia, cuidamos de toda a
          tecnologia da sua empresa.
        </p>
      </ScrollReveal>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-12"
      >
        {services.map((service) => {
          const Icon = icons[service.icon];
          return (
            <article
              key={service.id}
              data-service-card
              onMouseMove={handleSpotlight}
              className={cn(cardBaseClass, service.className)}
              style={cardBackground}
            >
              {/* Imagem de fundo (quando existir), com fade para a base */}
              {service.img && (
                <>
                  <img
                    src={service.img}
                    alt=""
                    aria-hidden="true"
                    data-card-photo
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(4,7,29,0.95) 20%, rgba(4,7,29,0.35) 70%, rgba(4,7,29,0.15) 100%)",
                    }}
                  />
                </>
              )}

              {/* Spotlight roxo que acompanha o cursor */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(560px circle at var(--mx, 50%) var(--my, 50%), rgba(203,172,249,0.12), transparent 45%)",
                }}
              />

              <div className="relative z-10">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-purple/10 border border-purple/25 text-purple mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-0.5">
                  <Icon className="w-5 h-5" />
                </span>
                <h2 className="font-bold text-lg lg:text-2xl">
                  {service.title}
                </h2>
                <p className="text-sm lg:text-base text-[#C1C2D3] mt-2 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            </article>
          );
        })}

        {/* Card de contato: copiar email */}
        <article
          data-service-card
          className={cn(
            cardBaseClass,
            "md:col-span-2 lg:col-span-4 items-center justify-center text-center min-h-[240px]"
          )}
          style={cardBackground}
        >
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>

          <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
            <h2 className="font-bold text-xl lg:text-3xl">
              Envie um email falando de sua necessidade em TI:
            </h2>

            <div className="mt-6 relative">
              <div className="absolute -bottom-5 right-0 pointer-events-none">
                <Lottie
                  options={lottieOptions}
                  height={200}
                  width={400}
                  eventListeners={[]}
                />
              </div>

              <MagicButton
                title={copied ? "Email copiado!" : "Copiar email"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Services;
