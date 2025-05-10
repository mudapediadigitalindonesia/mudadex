// src/app/components/HeroSection.tsx
import WaveBackground from "@/components/backgorund";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen text-sky-950 dark:text-neutral-400 overflow-hidden">
      <WaveBackground />
      <div className="relative z-10 flex flex-col justify-center h-full max-w-5xl px-6 mx-auto">
        <h2 className="text-lg md:text-xl">Welcome To Mudadex</h2>
        <h1 className="text-4xl md:text-6xl font-bold mt-2">
          The Future Of Crypto Trading!
        </h1>
        <p className="mt-4 text-lg max-w-2xl">
          Explore the world of crypto with ease, trade without limits, and
          embrace financial freedom in the digital era. With a user-friendly
          interface and a transparent system, Mudadex is the perfect choice for
          your investment future.
        </p>
        <button className="mt-6 px-6 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl w-fit">
          Try now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
