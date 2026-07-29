"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const achievements = [
  {
    src: "/image/achievement/dfb.jpg",
    title: "DFB-Pokal",
    year: "20/21"
  },
  {
    src: "/image/achievement/bundesliga-pots.webp",
    title: "Bundesliga POTS",
    year: "22/23"
  },
  {
    src: "/image/achievement/golden-boy.jpg",
    title: "Golden Boy",
    year: "2023"
  },
  {
    src: "/image/achievement/supercopa.jpg",
    title: "Supercopa de España",
    year: "23/24"
  },
  {
    src: "/image/achievement/laliga.jpg",
    title: "La Liga",
    year: "23/24"
  },
  {
    src: "/image/achievement/laliga-pots.webp",
    title: "La Liga POTS",
    year: "23/24"
  },
  {
    src: "/image/achievement/ucl.jpg",
    title: "UEFA Champions League",
    year: "23/24"
  },
  {
    src: "/image/achievement/uefa-supercup.jpg",
    title: "UEFA Super Cup",
    year: "2024"
  },
  {
    src: "/image/achievement/fifa-inter.jpg",
    title: "FIFA Intercontinental Cup",
    year: "2024"
  }
];

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(scrollRef.current, {
        x: () => {
          const scrollWidth = scrollRef.current?.scrollWidth || 0;
          const windowWidth = window.innerWidth;
          return -(scrollWidth - windowWidth);
        },
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => {
            const scrollWidth = scrollRef.current?.scrollWidth || 0;
            const windowWidth = window.innerWidth;
            return `+=${scrollWidth - windowWidth}`;
          },
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-[#0a0a0a] overflow-hidden relative">
      
      {/* Background Title */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full text-center opacity-5 pointer-events-none font-[var(--font-oswald)]">
        <h2 className="text-[20vw] whitespace-nowrap text-white font-bold uppercase leading-none">
          El Nuevo Galactico
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="h-full flex items-center gap-12 px-[10vw]"
        style={{ width: "fit-content" }}
      >
        {achievements.map((item, i) => (
          <div
            key={i}
            className="w-[70vw] md:w-[40vw] h-[60vh] md:h-[70vh] shrink-0 relative overflow-hidden rounded-sm group"
          >
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700" />
            <div className="absolute bottom-8 left-8 right-8 font-[var(--font-oswald)]">
              <span className="text-[#CFB53B] text-xl font-bold">
                {item.year}
              </span>
              <h3 className="text-white text-3xl md:text-5xl font-bold uppercase mt-2 leading-tight">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
        
        {/* Extra space at the end to make scroll smoother */}
        <div className="w-[10vw] shrink-0"></div>
      </div>
    </section>
  );
}
