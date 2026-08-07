"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const impactData = [
  {
    title: "The Celebration",
    subtitle: "A Global Phenomenon",
    text: "Arms wide open, embracing the pressure. A simple gesture that transcended the pitch and became a worldwide symbol of absolute confidence.",
    media: "/videos/celebration.mp4",
  },

  {
    title: "Pure Passion",
    subtitle: "Heart & Soul",
    text: "A profound love and burning desire for the game. He plays with raw emotion, willing to sacrifice everything for the badge and connecting deeply with the fans in both triumph and adversity.",
    media: "/videos/passion.mp4",
  },
  {
    title: "The Maestro",
    subtitle: "Midfield Masterclass",
    text: "Gliding through defensive lines with a unique blend of elegant footwork and raw physical dominance. Every touch, turn, and dribble dictates the tempo of the game.",
    media: "/videos/masterclass.mp4",
  }
];

const transitionImages = [
  "/image/jude-iconic.jpg",
  "/image/journey/england-7.jpg",
  "/image/journey/madrid-1.jpg",
  "/image/journey/madrid-4.jpg",
  "/image/journey/dortmund-7.jpg",
  "/image/journey/madrid-1.jpg",
  "/image/journey/madrid-2.jpg",
  "/image/journey/dortmund-6.jpg",
];

export default function Belligol() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaWrapperRef = useRef<HTMLDivElement>(null);

  const leftTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flashbackRefs = useRef<(HTMLImageElement | null)[]>([]);
  const stageMediaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      const buildTimeline = (targetWidth: string, targetHeight: string, targetRadius: string) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Smooth scrub
          }
        });

        // Animate the intro shrink and flashbacks sequence
        tl.to(mediaWrapperRef.current, {
          width: targetWidth,
          height: targetHeight,
          borderRadius: targetRadius,
          ease: "none",
          duration: 2
        }, 0);

        const flashSegment = 2 / transitionImages.length;
        transitionImages.forEach((_, i) => {
          tl.to(flashbackRefs.current[i], { opacity: 1, duration: flashSegment * 0.5 }, i * flashSegment);
          tl.to(flashbackRefs.current[i], { opacity: 0, duration: flashSegment * 0.5 }, (i * flashSegment) + flashSegment);
        });

        // Reveal the initial text stage
        tl.to(stageMediaRefs.current[0], { opacity: 1, duration: 0.5 }, 2);
        tl.fromTo(leftTextRefs.current[0],
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          2);
        tl.fromTo(rightTextRefs.current[0],
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
          2);
        tl.fromTo(titleRef.current,
          { opacity: 0, y: -20 },
          { opacity: 0.6, y: 0, duration: 0.5, ease: "power2.out" },
          2);

        // Crossfade through the remaining text stages
        let currentTime = 3.5;

        for (let i = 1; i < impactData.length; i++) {

          tl.to(stageMediaRefs.current[i - 1], { opacity: 0, duration: 0.5 }, currentTime);
          tl.to(leftTextRefs.current[i - 1], { opacity: 0, y: -50, duration: 0.5 }, currentTime);
          tl.to(rightTextRefs.current[i - 1], { opacity: 0, x: -50, duration: 0.5 }, currentTime);

          tl.to(stageMediaRefs.current[i], { opacity: 1, duration: 0.5 }, currentTime + 0.5);
          tl.fromTo(leftTextRefs.current[i],
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            currentTime + 0.5);
          tl.fromTo(rightTextRefs.current[i],
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
            currentTime + 0.5);

          currentTime += 2;
        }

        // Extend scroll duration slightly before unpinning
        tl.to({}, { duration: 1 }, currentTime);

        return tl;
      };

      // Initialize responsive timelines
      mm.add("(min-width: 768px)", () => {
        buildTimeline("30vw", "80vh", "24px");
      });

      mm.add("(max-width: 767px)", () => {
        buildTimeline("60vw", "55vh", "8px");
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[650vh] bg-[#0a0a0a] text-white overflow-visible border-t border-[#1a1a1a]">

      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute left-6 md:left-16 top-10 md:top-16 z-20 pointer-events-none">
          <h2 ref={titleRef} className="text-sm md:text-xl font-[var(--font-oswald)] font-bold text-white uppercase tracking-[0.3em] opacity-0">
            The Belligol
          </h2>
        </div>
        <div className="absolute left-6 md:left-16 bottom-8 md:bottom-24 flex flex-col z-30 md:z-10 w-[45%] md:w-full md:max-w-md pointer-events-none">
          {impactData.map((item, i) => (
            <div
              key={`left-${i}`}
              ref={(el) => { leftTextRefs.current[i] = el; }}
              className="absolute bottom-0 left-0 w-full opacity-0 flex flex-col"
            >
              <span className="text-[#CFB53B] font-[var(--font-oswald)] uppercase tracking-widest text-xs md:text-sm mb-1 md:mb-4 drop-shadow-md">
                {item.subtitle}
              </span>
              <h2 className="text-3xl md:text-7xl font-bold uppercase leading-tight md:leading-[0.9] font-[var(--font-oswald)] drop-shadow-2xl">
                {item.title.split(' ').map((word, wordIdx) => (
                  <span key={wordIdx} className="block">
                    {word}
                  </span>
                ))}
              </h2>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 md:inset-auto md:right-16 md:top-0 md:h-full z-30 md:z-10 w-full md:max-w-xs pointer-events-none">
          {impactData.map((item, i) => (
            <div
              key={`right-${i}`}
              ref={(el) => { rightTextRefs.current[i] = el; }}
              className="absolute inset-0 md:inset-auto md:w-full md:h-full opacity-0"
            >
              <h1 className="absolute top-8 right-6 md:top-[25%] md:right-0 text-6xl md:text-9xl font-[var(--font-oswald)] font-bold leading-none text-white opacity-40">
                0{i + 1}
              </h1>
              <p className="absolute bottom-8 right-6 w-[45%] md:bottom-24 md:left-0 md:right-auto md:w-auto text-gray-200 md:text-gray-300 text-[10px] md:text-base font-sans leading-tight md:leading-relaxed drop-shadow-lg text-left">
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <div
          ref={mediaWrapperRef}
          className="relative z-20 pointer-events-none overflow-hidden flex-shrink-0"
          style={{ width: "100vw", height: "100vh", borderRadius: "0px" }}
        >
          {transitionImages.map((src, i) => (
            <img
              key={`flash-${i}`}
              ref={(el) => { flashbackRefs.current[i] = el; }}
              src={src}
              alt={`Flashback ${i}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
          {impactData.map((item, i) => (
            <div
              key={`media-${i}`}
              ref={(el) => { stageMediaRefs.current[i] = el; }}
              className="absolute inset-0 w-full h-full opacity-0"
            >
              {item.media.endsWith('.mp4') || item.media.endsWith('.webm') ? (
                <video
                  src={item.media}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover grayscale md:grayscale-0"
                />
              ) : (
                <img
                  src={item.media}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale md:grayscale-0"
                />
              )}
            </div>
          ))}
          <div className="absolute inset-0 bg-black/40 md:bg-transparent z-10 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
