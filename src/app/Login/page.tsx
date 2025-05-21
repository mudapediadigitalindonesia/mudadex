"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  const [mode, setMode] = useState<"phone" | "email">("phone");

  return (
    <main className="grid grid-cols-12 gap-x-[100px] min-h-screen items-center px-8 bg-white dark:bg-zinc-900">
      {/* Kiri - Floating Phone */}
      <div className="hidden lg:flex col-span-5 justify-end">
        <FloatingPhone />
      </div>

      {/* Kanan - Form Login */}
      <div className="col-span-7 lg:col-span-4">
        <h1 className="text-3xl font-bold mb-6 text-zinc-950 dark:text-white">
          LOGIN
        </h1>

        <div className="flex space-x-6 mb-4">
          <button
            className={`font-semibold ${
              mode === "phone"
                ? "underline text-zinc-950 dark:text-blue-50"
                : "text-gray-500"
            }`}
            onClick={() => setMode("phone")}
          >
            Phone
          </button>
          <button
            className={`font-semibold ${
              mode === "email"
                ? "underline text-zinc-950 dark:text-blue-50"
                : "text-gray-500"
            }`}
            onClick={() => setMode("email")}
          >
            Email
          </button>
        </div>

        <input
          type={mode === "phone" ? "tel" : "email"}
          placeholder={
            mode === "phone" ? "Enter your phone number" : "Enter your email"
          }
          className="w-full border border-black rounded px-4 py-2 mb-6"
        />

        <button className="w-full bg-indigo-600 text-white font-semibold py-2 rounded">
          LOGIN
        </button>

        <p className="text-center text-zinc-950 dark:text-blue-50 hover:text-blue-900 mt-6">
          Don’t have an account?{" "}
          <Link href="/SignUp" className="font-bold underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}

// FloatingPhone dan Screen
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
        className="h-[500px] w-[240px] rounded-[24px] border-2 border-b-2 border-r-2 bg-neutral-900 p-1 pl-[3px] pt-[3px]"
      >
        <Screen />
      </motion.div>
    </div>
  );
};

const Screen = () => {
  return (
    <div className="h-full w-full overflow-hidden rounded-[20px] bg-white">
      <div className="h-full w-full relative">
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
