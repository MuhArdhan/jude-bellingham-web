"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Parallax image
    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Text parallax
    gsap.to(textRef1.current, {
      xPercent: -20,
      opacity: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(textRef2.current, {
      xPercent: 20,
      opacity: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none opacity-35">
        <style>{`
          @keyframes flow-r  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
          @keyframes flow-l  { from { transform: translateX(-50%); } to { transform: translateX(0); } }
          .wave-svg { position: absolute; width: 200%; height: 100%; top: 0; left: 0; }
          .fw1 { animation: flow-r  8s  linear infinite; }
          .fw2 { animation: flow-l  12s linear infinite; }
          .fw3 { animation: flow-r  10s linear infinite; }
          .fw4 { animation: flow-l  14s linear infinite; }
          .fw5 { animation: flow-r  9s  linear infinite; }
          .fw6 { animation: flow-l  11s linear infinite; }
          .fw7 { animation: flow-r  13s linear infinite; }
          .fw8 { animation: flow-l  15s linear infinite; }
        `}</style>

        <svg className="wave-svg fw1" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,100 C150,250 450,-50 600,100 C750,250 1050,-50 1200,100 C1350,250 1650,-50 1800,100 C1950,250 2250,-50 2400,100" stroke="#CFB53B" strokeWidth="2"/>
        </svg>

        <svg className="wave-svg fw2" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,130 C400,310 800,0 1200,130 C1600,310 2000,0 2400,130" stroke="#ffffff" strokeWidth="1" opacity="0.6"/>
        </svg>

        <svg className="wave-svg fw3" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,70 C400,240 800,-100 1200,70 C1600,240 2000,-100 2400,70" stroke="#CFB53B" strokeWidth="4" opacity="0.3"/>
        </svg>

        <svg className="wave-svg fw4" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,50 C300,200 900,-100 1200,50 C1500,200 2100,-100 2400,50" stroke="#CFB53B" strokeWidth="1.5" opacity="0.5"/>
        </svg>

        <svg className="wave-svg fw5" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,150 C150,0 450,300 600,150 C750,0 1050,300 1200,150 C1350,0 1650,300 1800,150 C1950,0 2250,300 2400,150" stroke="#ffffff" strokeWidth="0.5" opacity="0.8"/>
        </svg>

        <svg className="wave-svg fw6" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,90 C150,290 450,-110 600,90 C750,290 1050,-110 1200,90 C1350,290 1650,-110 1800,90 C1950,290 2250,-110 2400,90" stroke="#CFB53B" strokeWidth="3" opacity="0.2"/>
        </svg>

        <svg className="wave-svg fw7" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,110 C400,-60 800,300 1200,110 C1600,-60 2000,300 2400,110" stroke="#ffffff" strokeWidth="1.5" opacity="0.4"/>
        </svg>

        <svg className="wave-svg fw8" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,160 C400,30 800,350 1200,160 C1600,30 2000,350 2400,160" stroke="#CFB53B" strokeWidth="2.5" opacity="0.35"/>
        </svg>
      </div>

      {/* Background Text */}
      <div className="z-0 flex flex-col w-full px-6 md:px-16 font-[var(--font-oswald)] uppercase leading-none relative mt-16">
        <h1
          ref={textRef1}
          className="text-[12vw] font-bold text-transparent text-left"
          style={{ WebkitTextStroke: "2px #CFB53B" }}
        >
          Jude
        </h1>
        <h1
          ref={textRef2}
          className="text-[15vw] font-bold text-white text-right -mt-4 md:-mt-10"
        >
          Bellingham
        </h1>
      </div>

      {/* Foreground Image Cutout */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <img
          ref={imageRef}
          src="/image/jude-bellingham-hero.png"
          alt="Jude Bellingham"
          className="w-full h-[120%] object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-20" />
      </div>

      {/* Foreground */}
      <div className="absolute bottom-16 z-30 flex gap-4 text-lg font-sans uppercase tracking-widest text-[#CFB53B]">
        <span>Real Madrid</span>
        <span>•</span>
        <span>England</span>
      </div>
    </section>
  );
}
