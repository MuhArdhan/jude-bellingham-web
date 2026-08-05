import Hero from "./components/Hero";
import Quote from "./components/Quote";
import Stats from "./components/Stats";
import VerticalGallery from "./components/VerticalGallery";
import HorizontalScroll from "./components/HorizontalScroll";
import Belligol from "./components/Belligol";
import Socials from "./components/Socials";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />

      {/* Push-up transition wrapper */}
      <div className="relative">
        {/* Quote: sticks and gets pushed up */}
        <div className="sticky top-0 z-0 rounded-b-[3rem] overflow-hidden shadow-2xl">
          <Quote />
        </div>

        {/* Stats: slide up over Quote */}
        <div className="relative z-10 -mt-16 rounded-t-[3rem] bg-[#0a0a0a]">
          <Stats />
        </div>
      </div>

      <VerticalGallery />
      <HorizontalScroll />
      <Belligol />
      <Socials />

      {/* Simple Footer */}
      <footer className="py-20 bg-[#0a0a0a] text-center border-t border-[#1a1a1a]">
        <h2 className="font-[var(--font-oswald)] text-4xl md:text-6xl text-white uppercase font-bold mb-4">
          Jude Bellingham
        </h2>
        <p className="text-gray-500 uppercase tracking-widest text-sm">
          © {new Date().getFullYear()} - Designed with Lenis & GSAP
        </p>
      </footer>
    </main>
  );
}
