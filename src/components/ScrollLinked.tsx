"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Dummy data crypto
const cryptoData = [
  {
    name: "ETH",
    icon: "/images/eth.png",
    price: 1242725121,
    change: 10.03,
    link: "https://xinfin.org/",
  },
  {
    name: "XRP",
    icon: "/images/xrp.png",
    price: 1242725121,
    change: 10.03,
    link: "https://id.linkedin.com/",
  },
  {
    name: "USDT",
    icon: "/images/gambar4.jpg",
    price: 1242725121,
    change: 10.03,
  },
  { name: "BTC", icon: "/images/btc.png", price: 1242725121, change: 10.03 },
  { name: "SOL", icon: "/images/sol.jpg", price: 1242725121, change: 10.03 },
  { name: "XRP", icon: "/images/xrp.png", price: 1242725121, change: 10.03 },
  {
    name: "USDT",
    icon: "/images/gambar4.jpg",
    price: 1242725121,
    change: 10.03,
  },
  { name: "BTC", icon: "/images/btc.png", price: 1242725121, change: 10.03 },
  { name: "SOL", icon: "/images/sol.jpg", price: 1242725121, change: 10.03 },
  { name: "XRP", icon: "/images/xrp.png", price: 1242725121, change: 10.03 },
  {
    name: "USDT",
    icon: "/images/gambar4.jpg",
    price: 1242725121,
    change: 10.03,
  },
  { name: "BTC", icon: "/images/btc.png", price: 1242725121, change: 10.03 },
  { name: "SOL", icon: "/images/sol.jpg", price: 1242725121, change: 10.03 },
];

// Constants
const CARD_GAP = 20; // 20px gap antar card
const CARD_WIDTH = 180;
const CARD_FULL_WIDTH = CARD_WIDTH + CARD_GAP;
const VISIBLE_CARDS = 4;

export default function ScrollLinked() {
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);

  const clampIndex = (val: number) =>
    Math.max(0, Math.min(val, cryptoData.length - VISIBLE_CARDS));

  const handleNext = () => {
    const newIndex = clampIndex(index + 1);
    setIndex(newIndex);
    animate(x, -newIndex * CARD_FULL_WIDTH, { duration: 0.4 });
  };

  const handlePrev = () => {
    const newIndex = clampIndex(index - 1);
    setIndex(newIndex);
    animate(x, -newIndex * CARD_FULL_WIDTH, { duration: 0.4 });
  };

  // const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
  //   const direction = info.offset.x < -50 ? 1 : info.offset.x > 50 ? -1 : 0;
  //   const newIndex = clampIndex(index + direction);
  //   setIndex(newIndex);
  //   animate(x, -newIndex * CARD_FULL_WIDTH, { duration: 0.4 });
  // };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const direction = info.offset.x < -50 ? 1 : info.offset.x > 50 ? -1 : 0;
    const newIndex = clampIndex(index + direction);
    setIndex(newIndex);
    animate(x, -newIndex * CARD_FULL_WIDTH, { duration: 0.4 });
  };

  return (
    <div className="p-4 rounded-xl relative flex items-center justify-center">
      {/* Panah kiri */}
      <button
        onClick={handlePrev}
        disabled={index === 0}
        className="bg-white border-none rounded-full w-8 h-8 flex items-center justify-center shadow mr-4 disabled:opacity-30"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      {/* Container */}
      <div className="overflow-hidden w-[800px] px-2">
        <motion.div
          className="flex pr-2 pl-2"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          {cryptoData.map((crypto, i) => (
            <a
              key={i}
              href={crypto.link}
              className="bg-white border border-gray-700 rounded-[15px] shadow w-[160px] h-[140px] flex-shrink-0 flex flex-col justify-center items-center px-4 py-3 mr-[20px] gap-y-2 text-center transition-all duration-200 hover:scale-105 hover:shadow-xl hover:border-blue-500 hover:bg-blue-50 no-underline"
            >
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src={crypto.icon}
                  alt={crypto.name}
                  width={24}
                  height={24}
                />
                <span className="font-bold">{crypto.name}</span>
              </div>
              <div className="text-sm text-gray-800 font-medium">
                Rp {crypto.price.toLocaleString("id-ID")}
              </div>
              <div className="text-red-600 text-sm font-semibold flex items-center gap-1">
                🔻 {crypto.change}%
              </div>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Panah kanan */}
      <button
        onClick={handleNext}
        disabled={index >= cryptoData.length - VISIBLE_CARDS}
        className="bg-white border-none rounded-[15px] w-10 h-10 flex items-center justify-center ml-2 disabled:opacity-30"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
}
