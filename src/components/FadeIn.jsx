"use client";
import { motion } from "framer-motion";

const contents = [
  {
    title: "BITCOIN",
    subtitle: "BTC",
    description:
      "Deskripsi untuk BTC - Bitcoin adalah mata uang digital terdesentralisasi.",
  },
  {
    title: "XRP",
    subtitle: "(XRP)",
    description:
      "Deskripsi untuk XRP - XRP digunakan untuk transaksi lintas negara.",
  },
  {
    title: "GAMBAR 4",
    subtitle: "(Gambar4)",
    description: "Deskripsi untuk Gambar4 - Ini adalah token eksperimental.",
  },
  {
    title: "SOLANA",
    subtitle: "(SOL)",
    description: "Deskripsi untuk SOL - Solana fokus pada kecepatan transaksi.",
  },
  {
    title: "ETHEREUM",
    subtitle: "(ETH)",
    description: "Deskripsi untuk ETH - Ethereum mendukung smart contract.",
  },
];

export default function FadeIn({ activeIndex }) {
  const { title, subtitle, description } = contents[activeIndex];

  return (
    <motion.div
      key={activeIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mx-auto w-[499px] h-[415px] rounded-md text-justify">
        <div className="font-extrabold text-[50px] text-blue-50 dark:text-zinc-950">
          {title}
        </div>
        <div className="font-medium text-[29px] text-blue-50 dark:text-zinc-950">
          {subtitle}
        </div>
        <div className="text-[15px] text-blue-50 dark:text-zinc-950">
          {description}
        </div>
      </div>
    </motion.div>
  );
}
