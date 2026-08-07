"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/judebellingham/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/BellinghamJude",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "JB5 App",
    href: "https://www.jb5app.com/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate the big BELLINGHAM text
      gsap.fromTo(
        bigTextRef.current,
        { y: 120, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate top content sections
      gsap.fromTo(
        topContentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Divider line animation
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );


    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#060606] overflow-hidden rounded-t-[3rem] -mt-10 z-50 border-t border-white/5 shadow-[0_-30px_80px_rgba(0,0,0,0.9)]"
    >


      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Top content area */}
      <div ref={topContentRef} className="relative z-10 px-8 md:px-16 pt-20 pb-16">
        {/* Header row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">

          {/* Brand block */}
          <div className="flex flex-col gap-5 max-w-xs">
            <h3 className="font-[var(--font-oswald)] text-4xl md:text-5xl text-white uppercase font-black leading-[0.95] tracking-tight">
              The <br />
              <span className="text-[#CFB53B]">Golden</span> Boy
            </h3>
            <p className="text-white/40 text-sm leading-relaxed font-[var(--font-geist-sans)]">
              A cinematic tribute to Jude Bellingham's incredible journey
            </p>

          </div>

          {/* Right columns */}
          <div className="flex flex-wrap gap-16 md:gap-24">

            {/* Social links */}
            <div className="flex flex-col gap-4">
              <span className="font-[var(--font-oswald)] text-[10px] uppercase tracking-[0.4em] text-[#CFB53B] mb-1">
                Follow On
              </span>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-white/40 hover:text-white transition-all duration-300"
                >
                  <span className="text-white/25 group-hover:text-[#CFB53B] transition-colors duration-300">
                    {social.icon}
                  </span>
                  <span className="font-[var(--font-oswald)] text-sm uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform duration-300 inline-block">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="w-full h-[1px] origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #CFB53B66 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Massive display text */}
      <div
        ref={bigTextRef}
        className="relative w-full overflow-hidden flex items-center justify-center z-10 pb-4 px-4"
        style={{ perspective: "1200px" }}
      >
        <h1
          className="font-[var(--font-oswald)] text-[18vw] leading-none font-black uppercase text-center whitespace-nowrap select-none"
          style={{
            WebkitTextStroke: "1.5px rgba(207,181,59,0.18)",
            color: "transparent",
            textShadow: "0 0 80px rgba(207,181,59,0.05)",
          }}
        >
          BELLINGHAM
        </h1>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 px-8 md:px-16 pb-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/[0.04]">
        <p className="font-[var(--font-geist-sans)] text-white/20 text-[10px] uppercase tracking-[0.3em] text-center md:text-left leading-relaxed">
          © {new Date().getFullYear()} Jude Bellingham Tribute <br className="md:hidden" />
          <span className="hidden md:inline"> | </span>
          Made with passion by <a href="https://linktr.ee/ardhan.dev" target="_blank" rel="noopener noreferrer" className="hover:text-[#CFB53B] transition-colors duration-300 font-bold underline underline-offset-2 decoration-[#CFB53B]/50 hover:decoration-[#CFB53B]">Ardhan</a>
        </p>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          id="footer-back-to-top"
          className="group flex items-center gap-3 w-fit text-white/40 hover:text-[#CFB53B] transition-all duration-400"
        >
          <div className="w-9 h-9 rounded-full border border-white/15 group-hover:border-[#CFB53B] group-hover:bg-[#CFB53B]/10 flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.6)]">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-y-1 transition-transform duration-300"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </div>
          <span className="font-[var(--font-oswald)] text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold">
            Back to top
          </span>
        </button>
      </div>
    </footer>
  );
}
