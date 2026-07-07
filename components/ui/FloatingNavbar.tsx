"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLenis } from "@studio-freight/react-lenis";
import { cn } from "@/lib/utils";
import { ScrollTrigger } from "@/lib/gsap";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);
  const lenis = useLenis();

  // ScrollTrigger é atualizado pelo Lenis (ver SmoothScroll), então a direção
  // aqui fica sempre em sincronia com o scroll suavizado
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (self.progress < 0.05) {
          setVisible(true);
        } else {
          setVisible(self.direction === -1);
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        className={cn(
          // change rounded-full to rounded-lg
          // remove dark:border-white/[0.2] dark:bg-black bg-white border-transparent
          // change  pr-2 pl-8 py-2 to px-10 py-5
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4",
          className
        )}
        style={{
          backdropFilter: "blur(24px) saturate(150%)",
          backgroundColor: "rgba(9, 9, 11, 0.65)",
          borderRadius: "9999px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            onClick={(e) => {
              // Âncoras roladas pelo Lenis: chegada suave, no mesmo motor do
              // resto da página (em vez do salto nativo)
              if (lenis && navItem.link.startsWith("#")) {
                e.preventDefault();
                lenis.scrollTo(navItem.link, { offset: -110, duration: 1.6 });
              }
            }}
            className={cn(
              "relative dark:text-neutral-50 items-center  flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            {/* add !cursor-pointer */}
            {/* remove hidden sm:block for the mobile responsive */}
            <span className=" text-sm !cursor-pointer">{navItem.name}</span>
          </Link>
        ))}
        {/* remove this login btn */}
        {/* <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button> */}
      </motion.div>
    </AnimatePresence>
  );
};
