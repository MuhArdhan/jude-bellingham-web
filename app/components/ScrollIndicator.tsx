"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollIndicator() {
  const progressRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const ctx = gsap.context(() => {
      const vh = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      // Make it much smaller in height than a standard scrollbar for a sleek look
      const thumbHeight = Math.max((vh / pageHeight) * vh * 0.4, 5);
      
      gsap.set(progressRef.current, { height: thumbHeight });

      // The thumb translates down the screen instantly with scroll
      gsap.fromTo(
        progressRef.current,
        { y: 0 },
        {
          y: () => window.innerHeight - thumbHeight,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: () => {
              // Fade in immediately on scroll
              gsap.to(wrapperRef.current, { opacity: 1, duration: 0.2, overwrite: "auto" });

              // Reset the fade-out timer
              clearTimeout(timeoutId);
              timeoutId = setTimeout(() => {
                // Fade out after 1 second of inactivity
                gsap.to(wrapperRef.current, { opacity: 0, duration: 0.8, ease: "power2.out" });
              }, 1000);
            }
          },
        }
      );
    });

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, []);

  return (
    <div 
      ref={wrapperRef}
      className="fixed top-0 right-1 w-1 h-screen bg-transparent z-50 pointer-events-none py-1 opacity-0 transition-none"
    >
      <div
        ref={progressRef}
        className="w-full bg-[#CFB53B] rounded-full"
      />
    </div>
  );
}
