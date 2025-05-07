"use client";
import { motion } from "framer-motion";

export default function FadeIn() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="mx-auto w-[499px] h-[415px] rounded-md text-justify">
        <div className="font-extrabold text-[50px] text-sky-950 dark:text-gray-400:">
          MUDA PEDIA
        </div>
        <div className="font-medium text-[29px] text-sky-950 dark:text-gray-700">
          (MUDA)
        </div>
        <div className="text-[15px] text-sky-950 dark:text-gray-400">
          We, at MudaPedia, understand that the world of Web3, blockchain, and
          crypto is evolving rapidly, bringing new opportunities and challenges.
          As a startup at the heart of this revolution, we merge technology and
          creativity to build innovative solutions. Our team is committed to
          helping businesses grow within the decentralized ecosystem, creating a
          future that is more open, secure, and efficient for everyone.
        </div>
      </div>
    </motion.div>
  );
}
