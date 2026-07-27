"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 9 images — varied positions and sizes for a crowded, editorial feel
const verticalImages = [
  {
    src: "https://images.unsplash.com/photo-1551280857-2b9bbe52ccbd?q=80&w=800&auto=format&fit=crop",
    style: { width: "22vw", left: "5%",  top: "10%" },
    aspect: "3/4",
  },
  {
    src: "https://images.unsplash.com/photo-1521747113337-b930d6db11e2?q=80&w=800&auto=format&fit=crop",
    style: { width: "18vw", right: "8%", top: "20%" },
    aspect: "4/5",
  },
  {
    src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop",
    style: { width: "32vw", left: "32%", top: "35%" },
    aspect: "16/9",
  },
  {
    src: "https://images.unsplash.com/photo-1600250395378-953eb268a0a9?q=80&w=800&auto=format&fit=crop",
    style: { width: "16vw", right: "20%", top: "55%" },
    aspect: "4/5",
  },
  {
    src: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
    style: { width: "24vw", left: "12%", top: "65%" },
    aspect: "3/4",
  },
  {
    src: "https://images.unsplash.com/photo-1508344928928-7151b67de341?q=80&w=800&auto=format&fit=crop",
    style: { width: "20vw", right: "5%",  top: "75%" },
    aspect: "1/1",
  },
  {
    src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800&auto=format&fit=crop",
    style: { width: "28vw", left: "55%", top: "80%" },
    aspect: "3/4",
  },
  {
    src: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop",
    style: { width: "14vw", left: "3%",  top: "85%" },
    aspect: "1/1",
  },
  {
    src: "https://images.unsplash.com/photo-1518605368461-1ee7e30d885a?q=80&w=800&auto=format&fit=crop",
    style: { width: "30vw", left: "35%", top: "90%" },
    aspect: "16/9",
  },
];

export default function VerticalGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      const imgCount = imagesRef.current.length;
      const vh = window.innerHeight;

      // Fixed pixel values based on viewport — no dependency on wrapper height
      const animDuration  = vh * 1.8;   // each image travels 1.8x viewport height
      const staggerOffset = vh * 0.3;   // 0.5vh between each image start

      // Set wrapper height to exactly cover all animations + 1 viewport padding
      const lastEndPx = (imgCount - 1) * staggerOffset + animDuration;
      wrapperRef.current!.style.height = `${lastEndPx + vh}px`;

      // The height change pushes down subsequent sections.
      // Wait for layout to settle, then refresh ScrollTrigger to fix snapping.
      setTimeout(() => ScrollTrigger.refresh(), 50);

      imagesRef.current.forEach((img, i) => {
        if (!img) return;

        const startPx = i * staggerOffset;
        const endPx   = startPx + animDuration;

        gsap.fromTo(
          img,
          { y: "110vh", opacity: 1 },
          {
            keyframes: [
              { y: "0vh",    opacity: 1, ease: "linear" },
              { y: "-100vh", opacity: 0, ease: "linear"  },
            ],
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: `top+=${startPx} top`,
              end:   `top+=${endPx} top`,
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    // height set dynamically in useEffect based on number of images
    <div ref={wrapperRef} className="relative bg-[#0a0a0a]">
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden"
      >
        {/* Background Title */}
        <div className="absolute top-12 left-0 w-full text-center opacity-10 pointer-events-none font-[var(--font-oswald)] overflow-hidden z-0">
          <h2 className="text-[15vw] whitespace-nowrap text-white font-bold uppercase leading-none">
            The Journey
          </h2>
        </div>

        {/* Images */}
        <div className="absolute inset-0 w-full h-full">
          {verticalImages.map((img, i) => (
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
                alt={`Jude Bellingham Journey ${i + 1}`}
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
