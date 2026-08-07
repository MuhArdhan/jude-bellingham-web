"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  // Define references for animation targets
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const judeTextRef = useRef<SVGTextElement>(null);
  const bellTextRef = useRef<SVGTextElement>(null);
  const preloaderBgRef = useRef<HTMLDivElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  const bottomNavRef = useRef<HTMLDivElement>(null);

  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Lock scroll position during initialization
    document.body.style.overflow = "hidden";
    
    // Prevent browser from restoring scroll position on refresh
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    let ctx: gsap.Context;

    // Execute animation logic after custom fonts are fully loaded
    document.fonts.ready.then(() => {
      ctx = gsap.context(() => {
        // Calculate dynamic dimensions and scales for intro text
        const judeRect = judeTextRef.current!.getBoundingClientRect();
        const bellRect = bellTextRef.current!.getBoundingClientRect();
        const t1Rect = textRef1.current!.getBoundingClientRect();
        const t2Rect = textRef2.current!.getBoundingClientRect();
        const baseScale = window.innerWidth < 768 ? 0.35 : 0.5;
        const judeIntroScale = baseScale;
        const bellIntroScale = baseScale * (12 / 15);
        const w1 = judeRect.width * judeIntroScale;
        const w2 = bellRect.width * bellIntroScale;
        const gap = window.innerWidth < 768 ? 10 : 30;
        const totalW = w1 + gap + w2;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate text positioning offsets for perfect centering
        const targetBaselineY = centerY + (window.innerWidth < 768 ? 10 : 20);
        const judeBaselineY = t1Rect.top + (t1Rect.height * 0.85);
        const t1OffsetY = targetBaselineY - judeBaselineY;
        const bellBaselineY = t2Rect.top + (t2Rect.height * 0.85);
        const t2OffsetY = targetBaselineY - bellBaselineY;
        const judeTargetLeft = centerX - totalW / 2;
        const t1OffsetX = judeTargetLeft - t1Rect.left;
        const bellTargetRight = centerX + totalW / 2;
        const t2OffsetX = bellTargetRight - t2Rect.right;

        // Initialize GSAP timeline for intro animation
        const tl = gsap.timeline({
          onComplete: () => {
            // Restore scroll and setup parallax effects after intro
            document.body.style.overflow = "";
            setIsAnimating(false);

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
          }
        });

        // Set initial transform states for DOM elements
        gsap.set(textRef1.current, {
          x: t1OffsetX,
          y: t1OffsetY,
          scale: judeIntroScale,
          transformOrigin: "left 85%"
        });
        gsap.set(textRef2.current, {
          x: t2OffsetX,
          y: t2OffsetY,
          scale: bellIntroScale,
          transformOrigin: "right 85%"
        });
        gsap.set(judeTextRef.current, { strokeDasharray: 4000, strokeDashoffset: 4000, stroke: "#ffffff" });
        gsap.set(bellTextRef.current, { strokeDasharray: 4000, strokeDashoffset: 4000, fill: "transparent" });
        gsap.set(imageRef.current, { yPercent: 100 });
        gsap.set(bottomNavRef.current, { opacity: 0, y: 20 });
        gsap.set(preloaderBgRef.current, { opacity: 1 });
        
        // Setup Loading Bar right below the text, aligned to left edge of JUDE
        gsap.set(loadingBarRef.current, { 
          left: judeTargetLeft, 
          top: targetBaselineY + (window.innerWidth < 768 ? 15 : 25), 
          width: 0, 
          opacity: 1 
        });

        // Execute sequential drawing and transition animations
        tl.to(loadingBarRef.current, { width: totalW, duration: 3.0, ease: "power2.inOut" }, 0.5);
        tl.to(judeTextRef.current, { strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut" }, 0.5);
        tl.to(bellTextRef.current, { strokeDashoffset: 0, duration: 3.0, ease: "power2.inOut" }, 0.5);
        tl.to(bellTextRef.current, { fill: "#ffffff", duration: 0.8, ease: "power2.inOut" }, "colorChange");
        tl.to(judeTextRef.current, { stroke: "#CFB53B", duration: 0.8, ease: "power2.inOut" }, "colorChange");
        tl.to(loadingBarRef.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "colorChange");
        tl.to({}, { duration: 0.5 });
        tl.to(textRef1.current, { x: 0, y: 0, scale: 1, duration: 1.5, ease: "power4.inOut" }, "layout");
        tl.to(textRef2.current, { x: 0, y: 0, scale: 1, duration: 1.5, ease: "power4.inOut" }, "layout");
        tl.to(preloaderBgRef.current, { opacity: 0, duration: 1.2, ease: "power2.inOut" }, "layout+=0.3");
        tl.to(imageRef.current, { yPercent: 0, duration: 1.5, ease: "power3.out" }, "layout+=0.3");
        tl.to(bottomNavRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.5");

      }, containerRef);
    });

    return () => {
      if (ctx) ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#0a0a0a]"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-35">
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
          <path d="M0,100 C150,250 450,-50 600,100 C750,250 1050,-50 1200,100 C1350,250 1650,-50 1800,100 C1950,250 2250,-50 2400,100" stroke="#CFB53B" strokeWidth="2" />
        </svg>

        <svg className="wave-svg fw2" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,130 C400,310 800,0 1200,130 C1600,310 2000,0 2400,130" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
        </svg>

        <svg className="wave-svg fw3" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,70 C400,240 800,-100 1200,70 C1600,240 2000,-100 2400,70" stroke="#CFB53B" strokeWidth="4" opacity="0.3" />
        </svg>

        <svg className="wave-svg fw4" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,50 C300,200 900,-100 1200,50 C1500,200 2100,-100 2400,50" stroke="#CFB53B" strokeWidth="1.5" opacity="0.5" />
        </svg>

        <svg className="wave-svg fw5" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,150 C150,0 450,300 600,150 C750,0 1050,300 1200,150 C1350,0 1650,300 1800,150 C1950,0 2250,300 2400,150" stroke="#ffffff" strokeWidth="0.5" opacity="0.8" />
        </svg>

        <svg className="wave-svg fw6" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,90 C150,290 450,-110 600,90 C750,290 1050,-110 1200,90 C1350,290 1650,-110 1800,90 C1950,290 2250,-110 2400,90" stroke="#CFB53B" strokeWidth="3" opacity="0.2" />
        </svg>

        <svg className="wave-svg fw7" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,110 C400,-60 800,300 1200,110 C1600,-60 2000,300 2400,110" stroke="#ffffff" strokeWidth="1.5" opacity="0.4" />
        </svg>

        <svg className="wave-svg fw8" viewBox="0 0 2400 200" preserveAspectRatio="none" fill="none">
          <path d="M0,160 C400,30 800,350 1200,160 C1600,30 2000,350 2400,160" stroke="#CFB53B" strokeWidth="2.5" opacity="0.35" />
        </svg>
      </div>

      <div
        ref={preloaderBgRef}
        className="absolute inset-0 bg-[#0a0a0a] z-10 pointer-events-none"
      />

      <div 
        ref={loadingBarRef}
        className="absolute h-[2px] bg-[#CFB53B] z-50 pointer-events-none"
      />

      <div className={`z-20 flex flex-col w-full px-6 md:px-16 font-[var(--font-oswald)] uppercase leading-none relative mt-32 mb-auto md:mt-16 md:mb-0 ${isAnimating ? 'pointer-events-none' : ''}`}>
        <h1
          ref={textRef1}
          className="w-full text-left relative h-[12vw]"
        >
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            <text
              ref={judeTextRef}
              x="0"
              y="85%"
              fill="transparent"
              stroke="#ffffff"
              strokeWidth="2"
              className="font-bold text-[12vw]"
            >
              JUDE
            </text>
          </svg>
        </h1>

        <h1
          ref={textRef2}
          className="w-full text-right relative h-[15vw] -mt-2 md:-mt-8"
        >
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            <text
              ref={bellTextRef}
              x="100%"
              y="85%"
              fill="transparent"
              stroke="#ffffff"
              strokeWidth="2"
              textAnchor="end"
              className="font-bold text-[15vw]"
            >
              BELLINGHAM
            </text>
          </svg>
        </h1>
      </div>

      <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
        <img
          ref={imageRef}
          src="/image/jude-bellingham-hero.png"
          alt="Jude Bellingham"
          className="w-full h-[85%] md:h-[120%] absolute md:static bottom-0 md:bottom-auto object-cover object-top md:object-center opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-40" />
      </div>

      <div ref={bottomNavRef} className="absolute bottom-16 z-50 flex gap-4 text-lg font-sans uppercase tracking-widest text-[#CFB53B]">
        <span>Real Madrid</span>
        <span>•</span>
        <span>England</span>
      </div>
    </section>
  );
}
