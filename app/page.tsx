import Hero from "./components/Hero";
import Quote from "./components/Quote";
import Stats from "./components/Stats";
import CareerJourney from "./components/CareerJourney";
import CareerTrophy from "./components/CareerTrophy";
import Belligol from "./components/Belligol";
import Socials from "./components/Socials";
import Footer from "./components/Footer";

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

      <CareerJourney />
      <CareerTrophy />
      <Belligol />
      <Socials />

      <Footer />
    </main>
  );
}
