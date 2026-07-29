"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import MarqueeLogos from "./MarqueeLogos";

const stats = [
  { label: "Golden Boy", value: 2023, suffix: "" },
  { label: "Goals", value: 85, suffix: "+" },
  { label: "Assists", value: 60, suffix: "+" },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the title (index 0) and the stat items (index 1, 2, 3)
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        // Container fade in and slide up
        gsap.fromTo(
          item,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Only do number counting for actual stats (index > 0)
        if (index > 0) {
          const statIndex = index - 1; // shift back to map to stats array
          const numberEl = numbersRef.current[statIndex];
          const targetValue = stats[statIndex].value;
          const suffix = stats[statIndex].suffix;
          
          const counter = { val: 0 };

          gsap.to(counter, {
            val: targetValue,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
            onUpdate: () => {
              if (numberEl) {
                numberEl.innerText = Math.round(counter.val) + suffix;
              }
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center py-32 bg-[#0a0a0a] border-t border-[#1a1a1a] relative"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Title */}
        <h2 
          className="text-4xl md:text-6xl font-[var(--font-oswald)] uppercase font-bold text-white mb-20 tracking-wider text-center opacity-0 translate-y-12 will-change-[opacity,transform]"
          ref={(el) => {
            if (el && !itemsRef.current.includes(el)) {
              itemsRef.current.unshift(el);
            }
          }}
        >
          Career <span className="text-[#CFB53B]">Achievements</span>
        </h2>

        {/* Stats Grid */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => {
                itemsRef.current[i + 1] = el;
              }}
              className="flex flex-col items-center justify-center font-[var(--font-oswald)] opacity-0 translate-y-12 will-change-[opacity,transform]"
            >
              <div 
                ref={(el) => {
                  numbersRef.current[i] = el;
                }}
                className="text-[10vw] md:text-[8vw] leading-none text-[#CFB53B] font-bold tabular-nums"
              >
                0{stat.suffix}
              </div>
              <div className="text-xl md:text-2xl tracking-widest uppercase mt-4 text-gray-400 text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Logos at the bottom of Stats section */}
      <div className="w-full mt-24 relative z-0">
        <MarqueeLogos />
      </div>
    </section>
  );
}
