"use client";

import React, { useRef, useEffect } from "react";
import { ThemeToggle } from "@/app/theme-toggle";

export default function Home() {
  return (
    <div className="navbar sticky top-0 w-full flex justify-between items-center px-12 py-4 z-50 backdrop-blur-sm">
      <img
        src="/images/logo_footer.png"
        alt="Logo"
        className="logo w-[80px] h-[80px]"
      />
      <nav className="flex space-x-6 text-blue-50 dark:text-zinc-950 font-medium">
        <a href="#" className="hover:text-blue-900">
          BuyCrypto
        </a>
        <a href="#" className="hover:text-blue-900">
          Trade
        </a>
        <a href="#" className="hover:text-blue-900">
          Markets
        </a>
        <a href="#" className="hover:text-blue-900">
          Earn
        </a>
        <a href="#" className="hover:text-blue-900">
          About
        </a>
      </nav>
      <div className="auth-buttons flex items-center space-x-4 mr-24">
        <ThemeToggle />
        <button className="login px-4 py-2 rounded-md font-semibold text-blue-50 dark:text-black bg-transparent dark:bg-[#6c5ce7] hover:bg-white hover:text-[#0a0b2c] border border-blue-950 transition dark:border-black">
          Login
        </button>
        <button className="signup px-4 py-2 rounded-md font-semibold text-blue-950 bg-[#6c5ce7] dark:bg-transparent hover:bg-indigo-600 transition dark:border dark:border-blue-950 ">
          Sign Up
        </button>
      </div>
    </div>
  );
}
