"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const quoteText = "If you only love football for the game, you will always be rewarded. If you play for attention and fame, that's not the right way to do it.";

export default function Quote() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const quoteMarksRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate quote marks
      gsap.fromTo(
        quoteMarksRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate each word
      gsap.fromTo(
        wordsRef.current,
        { y: "120%" },
        {
          y: "0%",
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const words = quoteText.split(" ");

  return (
    <section
      ref={containerRef}
      className="py-16 px-6 md:px-20 bg-[#0a0a0a] min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-[#CFB53B]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        
        {/* Quote Block */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-[var(--font-oswald)] leading-tight text-white uppercase flex flex-wrap justify-center gap-x-3 gap-y-2">
          <span 
            ref={(el) => { quoteMarksRef.current[0] = el; }}
            className="text-[#CFB53B] text-5xl md:text-8xl leading-none inline-block origin-bottom mr-2"
          >
            "
          </span>
          
          {words.map((word, i) => (
            <span key={i} className="overflow-hidden inline-block pb-2">
              <span
                ref={(el) => { wordsRef.current[i] = el; }}
                className="inline-block transform"
              >
                {word}
              </span>
            </span>
          ))}

          <span 
            ref={(el) => { quoteMarksRef.current[1] = el; }}
            className="text-[#CFB53B] text-5xl md:text-8xl leading-none inline-block origin-top ml-2 self-end"
          >
            "
          </span>
        </h2>

        <div className="mt-12 text-gray-500 uppercase tracking-widest text-sm md:text-base font-sans overflow-hidden">
           <div
              ref={(el) => { wordsRef.current[words.length] = el; }}
              className="transform"
           >
             — Jude Bellingham
           </div>
        </div>
      </div>
    </section>
  );
}
