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

function EraSection({ era }: { era: typeof erasData[0] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const marqueeRef = useRef<HTMLHeadingElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !logoRef.current || !marqueeRef.current) return;

    const ctx = gsap.context(() => {
      const vh = window.innerHeight;
      const imgCount = imagesRef.current.length;

      // Configuration for animations
      const animDuration = vh * 1.5;
      const staggerOffset = vh * 0.4;
      const logoDelaySpace = vh * 0.5;
      const introScrollSpace = vh * 1.2;
      const tailScrollSpace = vh * 1.5;

      // Set the total scrollable height for this journey Section
      const totalScrollSpace = logoDelaySpace + introScrollSpace + ((imgCount - 1) * staggerOffset) + animDuration + tailScrollSpace;
      sectionRef.current!.style.height = `${totalScrollSpace}px`;

      // Logo starts big and scales down
      gsap.fromTo(logoRef.current,
        { scale: 3, opacity: 0 },
        {
          scale: 1, opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${logoDelaySpace} top`,
            end: `+=${introScrollSpace}`,
            scrub: true,
          }
        }
      );

      // Logo moves up after zooming in
      gsap.fromTo(logoRef.current,
        { y: "0vh" },
        {
          y: "-150vh",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${logoDelaySpace + introScrollSpace} top`,
            end: `top+=${logoDelaySpace + introScrollSpace + (vh * 1.5)} top`,
            scrub: true,
          }
        }
      );

      // Text moving continuously
      gsap.fromTo(marqueeRef.current,
        { xPercent: 0 },
        {
          xPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );

      // Parallax Images Animation
      imagesRef.current.forEach((img, i) => {
        if (!img) return;

        const startPx = logoDelaySpace + introScrollSpace + (i * staggerOffset);
        const endPx = startPx + animDuration;

        gsap.fromTo(
          img,
          { y: "110vh", opacity: 1 },
          {
            keyframes: [
              { y: "0vh", opacity: 1, ease: "linear" },
              { y: "-100vh", opacity: 0, ease: "linear" },
            ],
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${startPx} top`,
              end: `top+=${endPx} top`,
              scrub: true,
            },
          }
        );
      });

      setTimeout(() => ScrollTrigger.refresh(), 100);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-start opacity-10 font-[var(--font-oswald)] pointer-events-none z-0">
          <h1
            ref={marqueeRef}
            className="text-[25vw] whitespace-nowrap uppercase font-bold text-white tracking-tighter px-8"
          >
            {era.name} <span className="mx-8">•</span> {era.name} <span className="mx-8">•</span> {era.name} <span className="mx-8">•</span> {era.name}
          </h1>
        </div>

        {/* Club Logo */}
        <img
          ref={logoRef}
          src={era.logo}
          alt={era.name}
          className="w-40 md:w-64 h-auto object-contain z-10 drop-shadow-2xl opacity-0 transform scale-0"
        />

        {/* Era Images */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
          {era.images.map((img, i) => (
            <div
              key={i}
              ref={(el) => {
                imagesRef.current[i] = el;
              }}
              className="absolute rounded-sm overflow-hidden shadow-2xl shadow-black/60 transition-[filter] duration-700"
              style={img.style as React.CSSProperties}
            >
              <img
                src={img.src}
                alt={`Jude Bellingham ${era.name} ${i + 1}`}
                className="w-full h-full object-cover"
                style={{ aspectRatio: img.aspect }}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default function VerticalGallery() {
  return (
    <div className="relative bg-[#0a0a0a]">
      {erasData.map((era, index) => (
        <EraSection key={index} era={era} />
      ))}
    </div>
  );
}
