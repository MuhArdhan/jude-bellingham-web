"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Socials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const socialImages = [
    "/image/journey/madrid-1.jpg",
    "/image/journey/england-1.jpg",
    "/image/jude-iconic.jpg", // Center
    "/image/journey/dortmund-1.jpg",
    "/image/journey/birmingham-1.jpg",
  ];

  // Define target states for each card in the fan [Left2, Left1, Center, Right1, Right2]
  const cardStates = [
    { x: "-110%", y: 80, rotation: -20, scale: 0.8, zIndex: 10 },
    { x: "-55%", y: 40, rotation: -10, scale: 0.9, zIndex: 20 },
    { x: "0%", y: 0, rotation: 0, scale: 1, zIndex: 30 },
    { x: "55%", y: 40, rotation: 10, scale: 0.9, zIndex: 20 },
    { x: "110%", y: 80, rotation: 20, scale: 0.8, zIndex: 10 },
  ];

  // Mobile target states
  const mobileCardStates = [
    { x: "-70%", y: 60, rotation: -20, scale: 0.8, zIndex: 10 },
    { x: "-35%", y: 30, rotation: -10, scale: 0.9, zIndex: 20 },
    { x: "0%", y: 0, rotation: 0, scale: 1, zIndex: 30 },
    { x: "35%", y: 30, rotation: 10, scale: 0.9, zIndex: 20 },
    { x: "70%", y: 60, rotation: 20, scale: 0.8, zIndex: 10 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Initialize responsive animations
      mm.add("(min-width: 768px)", () => {
        gsap.to(cardsRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%", // Wait until the section is much higher (cards are in view)
            toggleActions: "play none none reverse", // Play on enter, reverse on leave back
          },
          x: (i) => cardStates[i].x,
          y: (i) => cardStates[i].y,
          rotation: (i) => cardStates[i].rotation,
          scale: (i) => cardStates[i].scale,
          delay: 0.8, // Add a longer delay so it settles in position first
          duration: 1.2,
          ease: "back.out(1.2)", // Nice springy spread
          stagger: { from: "center", amount: 0.2 }, // Fan out from the center card
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.to(cardsRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%", // Wait until cards are clearly visible on mobile
            toggleActions: "play none none reverse",
          },
          x: (i) => mobileCardStates[i].x,
          y: (i) => mobileCardStates[i].y,
          rotation: (i) => mobileCardStates[i].rotation,
          scale: (i) => mobileCardStates[i].scale,
          delay: 0.8, // Add longer delay
          duration: 1.2,
          ease: "back.out(1.2)",
          stagger: { from: "center", amount: 0.2 },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[120vh] bg-[#0a0a0a] flex flex-col items-center pt-32 pb-40 overflow-hidden"
    >
      <div className="flex flex-col items-center mb-24 z-40 text-center">
        <h2 className="font-[var(--font-oswald)] text-5xl md:text-8xl text-white uppercase font-bold tracking-tighter leading-[0.9]">
          What's up
          <br />
          <span className="text-[#CFB53B]">
            on socials
          </span>
        </h2>
      </div>

      <div className="relative w-full max-w-[240px] md:max-w-[300px] aspect-[9/16] flex items-center justify-center mx-auto mt-10 md:mt-0">
        {socialImages.map((src, i) => {
          const isHovered = hoveredIndex === i;
          const isLeftNeighbor = hoveredIndex !== null && i < hoveredIndex;
          const isRightNeighbor = hoveredIndex !== null && i > hoveredIndex;

          let innerClasses = "";
          if (isHovered) {
            innerClasses = "-translate-y-8 scale-110 shadow-[0_0_40px_rgba(207,181,59,0.4)]";
          } else if (isLeftNeighbor) {
            const dist = Math.abs(hoveredIndex - i);
            innerClasses = dist === 1 ? "-translate-x-12 -rotate-6 scale-95" : "-translate-x-6 -rotate-2 scale-90";
          } else if (isRightNeighbor) {
            const dist = Math.abs(hoveredIndex - i);
            innerClasses = dist === 1 ? "translate-x-12 rotate-6 scale-95" : "translate-x-6 rotate-2 scale-90";
          }

          return (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="absolute top-0 left-0 w-full h-full origin-bottom"
              style={{ zIndex: isHovered ? 50 : cardStates[i].zIndex }}
            >
              <div
                className={`w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer bg-black ${innerClasses}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={src}
                  alt={`Social highlight ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 md:mt-24 z-40 text-center flex flex-col items-center gap-12">
        <span
          className="text-sm md:text-lg font-[var(--font-oswald)] uppercase tracking-[0.3em] text-gray-400 border-b border-[#CFB53B]/50 pb-1"
        >
          Follow Jude on Social Media
        </span>

        <div className="flex items-center justify-center gap-6 md:gap-12 text-xs md:text-sm font-[var(--font-oswald)] uppercase tracking-[0.3em] md:tracking-[0.4em] text-gray-500">
          <a href="https://www.instagram.com/judebellingham/" target="_blank" rel="noopener noreferrer" className="inline-block hover:text-[#CFB53B] hover:-translate-y-1 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(207,181,59,0.8)] transition-all duration-300">
            Instagram
          </a>
          <span className="w-1.5 h-1.5 bg-[#CFB53B]/50 rounded-full"></span>
          <a href="https://www.jb5app.com/" target="_blank" rel="noopener noreferrer" className="inline-block text-white font-bold text-lg md:text-2xl tracking-[0.4em] md:tracking-[0.5em] hover:text-[#CFB53B] hover:-translate-y-1.5 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(207,181,59,1)] transition-all duration-300">
            JB5
          </a>
          <span className="w-1.5 h-1.5 bg-[#CFB53B]/50 rounded-full"></span>
          <a href="https://twitter.com/BellinghamJude" target="_blank" rel="noopener noreferrer" className="inline-block hover:text-[#CFB53B] hover:-translate-y-1 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(207,181,59,0.8)] transition-all duration-300">
            Twitter
          </a>
        </div>
      </div>
    </section>
  );
}
