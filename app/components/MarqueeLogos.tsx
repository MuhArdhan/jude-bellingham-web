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
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1 goes left
      const tween1 = gsap.to(row1Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
        force3D: true, 
      });

      // Row 2 goes right
      gsap.set(row2Ref.current, { xPercent: -50 });
      const tween2 = gsap.to(row2Ref.current, {
        xPercent: 0,
        ease: "none",
        duration: 30,
        repeat: -1,
        force3D: true, 
      });

      // Track scroll direction to reverse timeScale
      let direction = 1; 
      
      ScrollTrigger.create({
        onUpdate: (self) => {
          // Update direction
          if (self.direction !== direction) {
            direction = self.direction;
          }

          // Get scroll velocity and calculate a speed multiplier
          let velocity = Math.abs(self.getVelocity());
          
          if (velocity > 3000) velocity = 3000;
          
          const speedMultiplier = 1 + (velocity / 400);

          // Speed up while scrolling
          gsap.to([tween1, tween2], {
            timeScale: direction * speedMultiplier,
            duration: 0.2, 
            overwrite: true,
          });

          // Return to normal speed when scrolling stops
          gsap.to([tween1, tween2], {
            timeScale: direction,
            duration: 1.5,
            delay: 0.1,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-hidden pb-10 pt-4">
      {/* Row 1 */}
      <div className="flex w-[200%] md:w-[200vw] will-change-transform" ref={row1Ref}>
        {[...row1Logos, ...row1Logos].map((src, i) => (
          <div
            key={`r1-${i}`}
            className="w-full flex justify-center items-center px-4 md:px-12"
          >
            <img src={src} alt="Tournament Logo" className="h-16 md:h-24 w-auto object-contain brightness-50" />
          </div>
        ))}
      </div>

      <div className="h-12 md:h-20" />

      {/* Row 2 */}
      <div className="flex w-[200%] md:w-[200vw] will-change-transform" ref={row2Ref}>
        {[...row2Logos, ...row2Logos].map((src, i) => (
          <div
            key={`r2-${i}`}
            className="w-full flex justify-center items-center px-4 md:px-12"
          >
            <img src={src} alt="Tournament Logo" className="h-16 md:h-24 w-auto object-contain brightness-50" />
          </div>
        ))}
      </div>
    </div>
  );
}
