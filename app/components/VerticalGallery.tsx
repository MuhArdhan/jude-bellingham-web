"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 20 images — varied positions and sizes for a crowded, editorial feel
const verticalImages = [
  {
    src: "/image/journey/jude-1.jpg",
    style: { width: "22vw", left: "5%",  top: "10%" },
    aspect: "3/4",
  },
  {
    src: "/image/journey/jude-2.jpg",
    style: { width: "18vw", right: "8%", top: "20%" },
    aspect: "4/5",
  },
  {
    src: "/image/journey/jude-3.jpg",
    style: { width: "32vw", left: "32%", top: "35%" },
    aspect: "16/9",
  },
  {
    src: "/image/journey/jude-4.jpg",
    style: { width: "16vw", right: "20%", top: "55%" },
    aspect: "4/5",
  },
  {
    src: "/image/journey/jude-5.jpg",
    style: { width: "24vw", left: "12%", top: "65%" },
    aspect: "3/4",
  },
  {
    src: "/image/journey/jude-6.webp",
    style: { width: "20vw", right: "5%",  top: "75%" },
    aspect: "1/1",
  },
  {
    src: "/image/journey/jude-7.jpg",
    style: { width: "28vw", left: "55%", top: "80%" },
    aspect: "3/4",
  },
  {
    src: "/image/journey/jude-8.jpg",
    style: { width: "14vw", left: "3%",  top: "85%" },
    aspect: "1/2",
  },
  {
    src: "/image/journey/jude-9.jpg",
    style: { width: "20vw", left: "40%", top: "80%" },
    aspect: "2/3",
  },
  {
    src: "/image/journey/jude-10.webp",
    style: { width: "20vw", right: "55%", top: "5%" },
    aspect: "4/5",
  },
  {
    src: "/image/journey/jude-11.jpg",
    style: { width: "26vw", left: "10%", top: "28%" },
    aspect: "3/4",
  },
  {
    src: "/image/journey/jude-12.jpg",
    style: { width: "18vw", right: "12%", top: "45%" },
    aspect: "1/1",
  },
  {
    src: "/image/journey/jude-13.jpg",
    style: { width: "22vw", left: "45%", top: "60%" },
    aspect: "3/4",
  },
  {
    src: "/image/journey/jude-14.jpg",
    style: { width: "28vw", left: "8%", top: "70%" },
    aspect: "16/9",
  },
  {
    src: "/image/journey/jude-15.jpg",
    style: { width: "16vw", right: "15%", top: "85%" },
    aspect: "3/4",
  },
  {
    src: "/image/journey/jude-16.webp",
    style: { width: "24vw", left: "10%", top: "60%" },
    aspect: "4/5",
  },
  {
    src: "/image/journey/jude-17.jpg",
    style: { width: "14vw", right: "25%", top: "10%" },
    aspect: "3/4",
  },
  {
    src: "/image/journey/jude-18.jpg",
    style: { width: "30vw", left: "20%", top: "50%" },
    aspect: "16/9",
  },
  {
    src: "/image/journey/jude-19.jpg",
    style: { width: "20vw", right: "2%", top: "35%" },
    aspect: "3/4",
  },
  {
    src: "/image/journey/jude-20.webp",
    style: { width: "26vw", left: "30%", top: "30%" },
    aspect: "4/5",
  }
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
