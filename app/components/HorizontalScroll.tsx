"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const images = [
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop", // Placeholder 1
  "https://images.unsplash.com/photo-1508344928928-7151b67de341?q=80&w=1000&auto=format&fit=crop", // Placeholder 2
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop", // Placeholder 3
  "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=1000&auto=format&fit=crop", // Placeholder 4
];

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      
      gsap.to(scrollRef.current, {
        x: -(scrollWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollWidth}`,
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
        {images.map((src, i) => (
          <div
            key={i}
            className="w-[70vw] md:w-[40vw] h-[60vh] md:h-[70vh] shrink-0 relative overflow-hidden rounded-sm group"
          >
            <img
              src={src}
              alt={`Gallery ${i}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700" />
            <div className="absolute bottom-8 left-8 font-[var(--font-oswald)]">
              <span className="text-[#CFB53B] text-xl font-bold">0{i + 1}</span>
              <h3 className="text-white text-3xl md:text-5xl font-bold uppercase mt-2">
                Moment {i + 1}
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
