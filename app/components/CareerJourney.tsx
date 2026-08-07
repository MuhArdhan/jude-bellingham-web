"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const erasData = [
  {
    name: "BIRMINGHAM CITY",
    logo: "/svg/Birmingham_City_FC_logo.svg",
    images: [
      { src: "/image/journey/birmingham-1.jpg", style: { width: "22vw", left: "5%", top: "10%" }, aspect: "3/4" },
      { src: "/image/journey/birmingham-2.jpg", style: { width: "18vw", right: "8%", top: "20%" }, aspect: "4/5" },
      { src: "/image/journey/birmingham-3.jpg", style: { width: "32vw", left: "32%", top: "35%" }, aspect: "16/9" },
      { src: "/image/journey/birmingham-4.jpg", style: { width: "16vw", right: "20%", top: "55%" }, aspect: "4/5" },
      { src: "/image/journey/birmingham-5.jpg", style: { width: "24vw", left: "12%", top: "65%" }, aspect: "3/4" },
      { src: "/image/journey/birmingham-6.jpg", style: { width: "20vw", right: "5%", top: "75%" }, aspect: "1/1" },
    ]
  },
  {
    name: "BORUSSIA DORTMUND",
    logo: "/svg/Borussia_Dortmund_logo.svg",
    images: [
      { src: "/image/journey/dortmund-2.jpg", style: { width: "28vw", left: "5%", top: "10%" }, aspect: "3/4" },
      { src: "/image/journey/dortmund-1.jpg", style: { width: "14vw", left: "43%", top: "5%" }, aspect: "1/2" },
      { src: "/image/journey/dortmund-3.jpg", style: { width: "32vw", right: "10%", top: "20%" }, aspect: "16/9" },
      { src: "/image/journey/dortmund-4.jpg", style: { width: "22vw", left: "15%", top: "40%" }, aspect: "4/5" },
      { src: "/image/journey/dortmund-5.jpg", style: { width: "26vw", right: "5%", top: "55%" }, aspect: "2/3" },
      { src: "/image/journey/dortmund-6.jpg", style: { width: "18vw", left: "20%", top: "70%" }, aspect: "2/3" },
      { src: "/image/journey/dortmund-7.jpg", style: { width: "22vw", right: "35%", top: "85%" }, aspect: "1/1" },
    ]
  },
  {
    name: "REAL MADRID",
    logo: "/svg/Real_Madrid_CF.svg",
    images: [
      { src: "/image/journey/madrid-1.jpg", style: { width: "28vw", left: "8%", top: "5%" }, aspect: "16/9" },
      { src: "/image/journey/madrid-2.jpg", style: { width: "16vw", right: "15%", top: "15%" }, aspect: "3/4" },
      { src: "/image/journey/madrid-3.jpg", style: { width: "32vw", left: "10%", top: "35%" }, aspect: "16/9" },
      { src: "/image/journey/madrid-4.jpg", style: { width: "14vw", right: "25%", top: "50%" }, aspect: "3/4" },
      { src: "/image/journey/madrid-5.webp", style: { width: "30vw", left: "20%", top: "65%" }, aspect: "4/5" },
      { src: "/image/journey/madrid-6.jpg", style: { width: "20vw", right: "5%", top: "75%" }, aspect: "3/4" },
      { src: "/image/journey/madrid-7.webp", style: { width: "26vw", left: "30%", top: "85%" }, aspect: "4/5" }
    ]
  },
  {
    name: "ENGLAND NATIONAL TEAM",
    logo: "/svg/England_national_football.svg",
    images: [
      { src: "/image/journey/england-1.jpg", style: { width: "22vw", left: "10%", top: "10%" }, aspect: "3/4" },
      { src: "/image/journey/england-2.jpg", style: { width: "16vw", right: "12%", top: "20%" }, aspect: "4/5" },
      { src: "/image/journey/england-3.webp", style: { width: "28vw", left: "5%", top: "35%" }, aspect: "2/3" },
      { src: "/image/journey/england-4.jpg", style: { width: "18vw", right: "25%", top: "50%" }, aspect: "3/4" },
      { src: "/image/journey/england-5.jpg", style: { width: "26vw", left: "25%", top: "65%" }, aspect: "3/4" },
      { src: "/image/journey/england-6.jpg", style: { width: "20vw", right: "5%", top: "75%" }, aspect: "4/5" },
      { src: "/image/journey/england-7.jpg", style: { width: "24vw", left: "15%", top: "85%" }, aspect: "1/1" },
    ]
  }
];

export default function CareerJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeWrapperRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<(HTMLImageElement | null)[]>([]);

  const imagesRefs = useRef<(HTMLDivElement | null)[][]>(
    erasData.map(() => [])
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Main timeline controlling all scroll-bound animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      const eraDuration = 10;
      const initialBuffer = 1;
      const totalDuration = initialBuffer + (erasData.length * eraDuration);

      // Continuous background marquee moving leftwards
      tl.to(marqueeWrapperRef.current, {
        x: () => {
          const scrollWidth = marqueeWrapperRef.current?.scrollWidth || 0;
          const windowWidth = window.innerWidth;
          return -(scrollWidth - windowWidth);
        },
        ease: "none",
        duration: totalDuration
      }, 0);

      erasData.forEach((era, i) => {
        const eraStart = initialBuffer + (i * eraDuration);

        // Club logo zooms in and immediately flies up
        tl.fromTo(logosRef.current[i],
          { scale: 3, opacity: 0, y: "0vh" },
          { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" },
          eraStart);

        tl.to(logosRef.current[i],
          { y: "-150vh", duration: 3, ease: "none" },
          eraStart + 1.5);

        tl.set(logosRef.current[i], { opacity: 0 }, eraStart + 4.5);

        // Staggered parallax images flying upwards
        const imgCount = era.images.length;
        const spawnDuration = 3.5;
        const imgStagger = spawnDuration / imgCount;
        const flyDuration = 4.5;

        era.images.forEach((_, imgIdx) => {
          const imgRef = imagesRefs.current[i][imgIdx];
          if (!imgRef) return;

          const imgStart = eraStart + 1.5 + (imgIdx * imgStagger);

          tl.fromTo(imgRef,
            { y: "150vh", opacity: 1 },
            { y: "-250vh", opacity: 1, duration: flyDuration, ease: "none" },
            imgStart);

          tl.set(imgRef, { opacity: 0 }, imgStart + flyDuration);
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[1500vh] md:h-[3000vh] bg-[#0a0a0a] gallery-section">
      <style>{`
        .gallery-section { --gallery-scale: 2.5; }
        @media (min-width: 768px) { .gallery-section { --gallery-scale: 1; } }
      `}</style>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-start z-0 overflow-hidden opacity-10 pointer-events-none">
          <div
            ref={marqueeWrapperRef}
            className="flex items-center h-full will-change-transform w-max px-8"
          >
            {erasData.map((era, i) => (
              <div key={`marquee-${i}`} className="shrink-0 flex items-center whitespace-nowrap">
                <h1 className="text-[25vw] uppercase font-bold text-white tracking-tighter leading-none">
                  {era.name} <span className="mx-8 md:mx-16">•</span> {era.name} <span className="mx-8 md:mx-16">•</span> {era.name} <span className="mx-8 md:mx-16">•</span>
                </h1>
              </div>
            ))}
          </div>
        </div>

        {erasData.map((era, i) => (
          <div key={`era-container-${i}`} className="absolute inset-0 flex items-center justify-center pointer-events-none">

            {/* Club Logo */}
            <img
              ref={(el) => { logosRef.current[i] = el; }}
              src={era.logo}
              alt={era.name}
              className="w-40 md:w-64 h-auto object-contain z-10 drop-shadow-2xl opacity-0"
            />

            {/* Era Images */}
            <div className="absolute inset-0 w-full h-full z-20">
              {era.images.map((img, imgIdx) => (
                <div
                  key={`img-${i}-${imgIdx}`}
                  ref={(el) => { imagesRefs.current[i][imgIdx] = el; }}
                  className="absolute rounded-sm overflow-hidden shadow-2xl shadow-black/60 opacity-0 transform border border-[#CFB53B]/20"
                  style={{ ...img.style, width: `calc(${img.style.width} * var(--gallery-scale))` } as React.CSSProperties}
                >
                  <img
                    src={img.src}
                    alt={`Jude Bellingham ${era.name} ${imgIdx + 1}`}
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: img.aspect }}
                  />
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}
