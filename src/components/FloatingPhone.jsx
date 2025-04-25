"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

const FloatingPhoneComp = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (!container) return;

      container.scrollBy({ left: 500, behavior: "smooth" });

      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth / 2;

      // Reset ke awal saat udah lewat separuh (tapi gak kelihatan karena clone)
      if (scrollLeft >= maxScrollLeft) {
        container.scrollLeft = 0;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="overflow-x-auto hide-scrollbar px-[90px] pt-[220px] snap-x snap-mandatory"
      ref={containerRef}
    >
      <div className="flex gap-[65px] w-max">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div key={idx} className="snap-start">
            <FloatingPhone />
          </div>
        ))}
      </div>
    </section>
  );
};

const FloatingPhone = () => {
  return (
    <div style={{ transformStyle: "preserve-3d" }}>
      <motion.div
        initial={{
          transform: "translateZ(8px) translateY(-2px)",
        }}
        animate={{
          transform: "translateZ(32px) translateY(-8px)",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
          ease: "easeInOut",
        }}
        className="h-[650px] w-[300px] rounded-[24px] border-2 border-b-2 border-r-2 bg-neutral-900 p-1 pl-[3px] pt-[3px]"
      >
        <Screen />
      </motion.div>
    </div>
  );
};

const Screen = () => {
  return (
    <div className="h-full w-full overflow-hidden rounded-[20px] bg-white">
      <div className="h-[630px] w-full relative">
        <Image
          src="/images/gambar1.png"
          alt="gambar1"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default FloatingPhoneComp;
