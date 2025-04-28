"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
    link: "https://www.crunchyroll.com/id/?srsltid=AfmBOorzhDqVybS_m2lO71Z3ro-5M46_F2oEzdkeLrFqX24jSzNQW_69",
  },
  {
    id: 2,
    logo: "/images/xrp.png",
    name: "Featured Token",
    price: "$3.691",
    marketCap: "$3.69K",
    volume: "$0",
    address: "BQzzg...Prxp9",
    link: "https://www.crunchyroll.com/id/?srsltid=AfmBOorzhDqVybS_m2lO71Z3ro-5M46_F2oEzdkeLrFqX24jSzNQW_69",
  },
  {
    id: 3,
    logo: "/images/usdt.jpg",
    name: "Featured Token",
    price: "$3.691",
    marketCap: "$3.69K",
    volume: "$0",
    address: "BQzzg...Prxp9",
    link: "https://www.crunchyroll.com/id/?srsltid=AfmBOorzhDqVybS_m2lO71Z3ro-5M46_F2oEzdkeLrFqX24jSzNQW_69",
  },
  {
    id: 4,
    logo: "/images/sol.jpg",
    name: "Featured Token",
    price: "$3.691",
    marketCap: "$3.69K",
    volume: "$0",
    address: "BQzzg...Prxp9",
    link: "https://www.crunchyroll.com/id/?srsltid=AfmBOorzhDqVybS_m2lO71Z3ro-5M46_F2oEzdkeLrFqX24jSzNQW_69",
  },
  {
    id: 5,
    logo: "/images/eth.png",
    name: "Featured Token",
    price: "$3.691",
    marketCap: "$3.69K",
    volume: "$0",
    address: "BQzzg...Prxp9",
    link: "https://www.crunchyroll.com/id/?srsltid=AfmBOorzhDqVybS_m2lO71Z3ro-5M46_F2oEzdkeLrFqX24jSzNQW_69",
  },
];

const SwipeCards = () => {
  const [cards, setCards] = useState<CardType[]>(cardData);
  const [removedCards, setRemovedCards] = useState<CardType[]>([]);

  return (
    <div className="relative h-[500px] w-full grid place-items-center ">
      {cards.map((card) => (
        <Card
          key={card.id}
          {...card} // ⬅ ini udah otomatis include `link`
          cards={cards}
          setCards={setCards}
          removedCards={removedCards}
          setRemovedCards={setRemovedCards}
        />
      ))}
    </div>
  );
};

const Card = ({
  id,
  logo,
  name,
  price,
  marketCap,
  volume,
  address,
  link, // ⬅ tambahin ini
  setCards,
  cards,
  removedCards,
  setRemovedCards,
}: CardType & {
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  cards: CardType[];
  removedCards: CardType[];
  setRemovedCards: React.Dispatch<React.SetStateAction<CardType[]>>;
}) => {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    const dragValue = x.get();

    if (dragValue > 100) {
      // Geser ke kanan => Remove kartu
      setCards((prev) => {
        const removedCard = prev.find((card) => card.id === id);
        if (removedCard) {
          setRemovedCards((r) => [removedCard, ...r]);
        }
        return prev.filter((card) => card.id !== id);
      });
    } else if (dragValue < -100 && removedCards.length > 0) {
      // Geser ke kiri => Kembalikan kartu terakhir
      const lastRemoved = removedCards[0];
      setRemovedCards((prev) => prev.slice(1));
      setCards((prev) => [...prev, lastRemoved]);
    }
  };

  return (
    <motion.div
      className="absolute w-[360px] rounded-xl bg-white p-4 shadow-xl cursor-grab active:cursor-grabbing"
      style={{
        x,
        rotate,
        opacity,
        zIndex: isFront ? 50 : id,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: -300, right: 300 }}
      dragElastic={0.2}
      dragListener={true}
      onDragEnd={handleDragEnd}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-semibold text-sm text-gray-600">{name}</h2>
        <span className="text-purple-500">✨</span>
      </div>
      <div className="flex gap-4 items-center">
        <img src={logo} alt="logo" className="w-20 h-20 rounded-full" />
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          <div>
            <p className="text-gray-500">Price</p>
            <p>{price}</p>
          </div>
          <div>
            <p className="text-gray-500">Market Cap</p>
            <p>{marketCap}</p>
          </div>
          <div>
            <p className="text-gray-500">Volume</p>
            <p>{volume}</p>
          </div>
          <div>
            <p className="text-gray-500">Address</p>
            <p className="truncate">{address}</p>
          </div>
        </div>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 block w-full rounded-md border border-black py-2 text-center text-sm font-medium hover:bg-black hover:text-white transition"
        onPointerDown={(e) => e.stopPropagation()}
      >
        View Details ↗
      </a>
    </motion.div>
  );
};

export default SwipeCards;
