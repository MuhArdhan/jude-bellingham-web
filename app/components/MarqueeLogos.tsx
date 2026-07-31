"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const row1Logos = [
  "/svg/LaLiga_EA_Sports_2023_Vertical_Logo.svg",
  "/svg/Bundesliga_logo_(2017).svg",
  "/svg/EFL_Championship_Logo.svg",
  "/svg/UEFA_Champions_League.svg",
  "/svg/UEFA_Europa_League_logo_(2024_version).svg",
  "/svg/Copa_del_Rey_logo_(2021).svg",
  "/svg/Supercopa-de-España-RFEF.svg",
  "/svg/FA_Cup_logo_(2020).svg",
  "/svg/UEFA_Super_Cup_logo.svg",
];

const row2Logos = [
  "/svg/2022_FIFA_World_Cup.svg",
  "/svg/DFB-Pokal_Logo_2026.svg",
  "/svg/EFL_(Carabao)_Cup_Logo.svg",
  "/svg/UEFA_Euro_2020_Logo.svg",
  "/svg/UEFA_Euro_2024_Logo.svg",
  "/svg/FIFA_Intercontinental_Cup_logo.svg",
  "/svg/UEFA_Nations_League.svg",
  "/svg/Franz_Beckenbauer_Supercup_logo.svg",
  "/svg/2026_FIFA_World_Cup_emblem.svg",
];

export default function MarqueeLogos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tween1 = gsap.to(row1Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
        force3D: true,
      });

      gsap.set(row2Ref.current, { xPercent: -50 });
      const tween2 = gsap.to(row2Ref.current, {
        xPercent: 0,
        ease: "none",
        duration: 40,
        repeat: -1,
        force3D: true,
      });

      const row1Items = gsap.utils.toArray(".row1-logo");
      gsap.fromTo(row1Items,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: (index) => {
            if (index < 9) return index * 0.05;
            return 0;
          },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true
          }
        }
      );

      const row2Items = gsap.utils.toArray(".row2-logo");
      gsap.fromTo(row2Items,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: (index) => {
            if (index >= 9) return (index - 9) * 0.05;
            return 0;
          },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true
          }
        }
      );

      let direction = 1;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          if (self.direction !== direction) {
            direction = self.direction;
          }

          let velocity = Math.abs(self.getVelocity());
          if (velocity > 3000) velocity = 3000;

          const speedMultiplier = 1 + (velocity / 500);

          gsap.to([tween1, tween2], {
            timeScale: direction * speedMultiplier,
            duration: 0.2,
            overwrite: true,
          });

          gsap.to([tween1, tween2], {
            timeScale: direction,
            duration: 1.5,
            delay: 0.1,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-hidden" ref={containerRef}>
      {/* Row 1 */}
      <div className="flex w-max will-change-transform items-center" ref={row1Ref}>
        {[...row1Logos, ...row1Logos].map((src, i) => (
          <div
            key={`r1-${i}`}
            className="row1-logo w-[100px] md:w-[140px] lg:w-[180px] shrink-0 flex justify-center items-center px-4"
          >
            <img
              src={src}
              alt="Tournament Logo"
              loading="lazy"
              decoding="async"
              className="h-12 md:h-16 w-auto object-contain grayscale invert mix-blend-screen opacity-60 hover:opacity-100 transition-opacity duration-300 transform-gpu"
            />
          </div>
        ))}
      </div>

      <div className="h-8 md:h-16" />

      {/* Row 2 */}
      <div className="flex w-max will-change-transform items-center" ref={row2Ref}>
        {[...row2Logos, ...row2Logos].map((src, i) => (
          <div
            key={`r2-${i}`}
            className="row2-logo w-[100px] md:w-[140px] lg:w-[180px] shrink-0 flex justify-center items-center px-4"
          >
            <img
              src={src}
              alt="Tournament Logo"
              loading="lazy"
              decoding="async"
              className="h-12 md:h-16 w-auto object-contain grayscale invert mix-blend-screen opacity-60 hover:opacity-100 transition-opacity duration-300 transform-gpu"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
