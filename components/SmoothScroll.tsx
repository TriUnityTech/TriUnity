"use client";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { ReactNode, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisGsapBridge = () => {
  const lenis = useLenis(ScrollTrigger.update);

  useEffect(() => {
    if (!lenis) return;

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Recalcula as posições de pin/trigger quando as imagens terminam de
    // carregar (evita cenas desalinhadas por altura tardia)
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      gsap.ticker.remove(raf);
      window.removeEventListener("load", onLoad);
    };
  }, [lenis]);

  return null;
};

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        lerp: 0.05,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
};
