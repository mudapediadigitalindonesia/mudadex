"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type CardType = {
  id: number;
  logo: string;
  name: string;
  price: string;
  marketCap: string;
  volume: string;
  address: string;
  link: string;
};

const cardData: CardType[] = [
  {
    id: 1,
    logo: "/images/btc.png",
    name: "Featured Token",
    price: "$3.691",
    marketCap: "$3.69K",
    volume: "$0",
    address: "BQzzg...Prxp9",
    link: "https://www.crunchyroll.com/id/",
  },
  {
    id: 2,
    logo: "/images/xrp.png",
    name: "Featured Token",
    price: "$3.691",
    marketCap: "$3.69K",
    volume: "$0",
    address: "BQzzg...Prxp9",
    link: "https://www.crunchyroll.com/id/",
  },
  {
    id: 3,
    logo: "/images/gambar4.jpg",
    name: "Featured Token",
    price: "$3.691",
    marketCap: "$3.69K",
    volume: "$0",
    address: "BQzzg...Prxp9",
    link: "https://www.crunchyroll.com/id/",
  },
  {
    id: 4,
    logo: "/images/sol.jpg",
    name: "Featured Token",
    price: "$3.691",
    marketCap: "$3.69K",
    volume: "$0",
    address: "BQzzg...Prxp9",
    link: "https://www.crunchyroll.com/id/",
  },
  {
    id: 5,
    logo: "/images/eth.png",
    name: "Featured Token",
    price: "$3.691",
    marketCap: "$3.69K",
    volume: "$0",
    address: "BQzzg...Prxp9",
    link: "https://www.crunchyroll.com/id/",
  },
];

const SwipeCards = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left" || direction === "right") {
      setStartIndex((prev) => (prev + 1) % cardData.length);
    }
  };

  const first = cardData[startIndex];
  const second = cardData[(startIndex + 1) % cardData.length];

  return (
    <div className="relative h-[500px] w-full flex items-center justify-center overflow-hidden">
      {[second, first].map((card, index) => (
        <SwipeCard
          key={card.id}
          card={card}
          isFront={index === 1}
          onSwipe={handleSwipe}
        />
      ))}
    </div>
  );
};

const SwipeCard = ({
  card,
  isFront,
  onSwipe,
}: {
  card: CardType;
  isFront: boolean;
  onSwipe: (direction: "left" | "right") => void;
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const handleDragEnd = () => {
    const offset = x.get();
    if (offset > 100) {
      onSwipe("right");
    } else if (offset < -100) {
      onSwipe("left");
    }
  };

  return (
    <motion.div
      className="absolute w-[320px] bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl cursor-grab active:cursor-grabbing"
      style={{
        x,
        rotate: isFront ? rotate : 0,
        zIndex: isFront ? 10 : 5,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: -300, right: 300 }}
      dragElastic={0.3}
      onDragEnd={handleDragEnd}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-semibold text-sm text-gray-600 dark:text-neutral-400">
          {card.name}
        </h2>
        <span className="text-purple-500">✨</span>
      </div>
      <div className="flex gap-4 items-center">
        <img src={card.logo} alt="logo" className="w-20 h-20 rounded-full" />
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-neutral-400">
          <div>
            <p className="text-sky-950 dark:text-neutral-400">Price</p>
            <p>{card.price}</p>
          </div>
          <div>
            <p className="text-sky-950 dark:text-neutral-400">Market Cap</p>
            <p>{card.marketCap}</p>
          </div>
          <div>
            <p className="text-sky-950 dark:text-neutral-400">Volume</p>
            <p>{card.volume}</p>
          </div>
          <div>
            <p className="text-sky-950 dark:text-neutral-400">Address</p>
            <p className="truncate">{card.address}</p>
          </div>
        </div>
      </div>
      <a
        href={card.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 block w-full rounded-md border py-2 text-center text-sm font-medium dark:hover:bg-neutral-400 hover:bg-sky-950 hover:text-white transition text-sky-950 dark:text-neutral-400"
        onPointerDown={(e) => e.stopPropagation()}
      >
        View Details ↗
      </a>
    </motion.div>
  );
};

export default SwipeCards;
