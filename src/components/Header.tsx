"use client";

import React, { useRef, useEffect } from "react";
import WavePage from "@/components/backgorund";

export default function Home() {
  return (
    <div className="navbar absolute top-0 w-full flex justify-between items-center px-12 py-4 z-20">
      <img
        src="/images/logo_footer.png"
        alt="Logo"
        className="logo w-[80px] h-[80px]"
      />
      <nav className="flex space-x-6 text-slate-300 font-medium">
        <a href="#" className="hover:text-white">
          BuyCrypto
        </a>
        <a href="#" className="hover:text-white">
          Trade
        </a>
        <a href="#" className="hover:text-white">
          Markets
        </a>
        <a href="#" className="hover:text-white">
          Earn
        </a>
        <a href="#" className="hover:text-white">
          About
        </a>
      </nav>
      <div className="auth-buttons flex items-center space-x-4 mr-24">
        <button className="login px-4 py-2 rounded-md font-semibold text-white bg-transparent hover:bg-white hover:text-[#0a0b2c] border border-white transition">
          Login
        </button>
        <button className="signup px-4 py-2 rounded-md font-semibold text-white bg-[#6c5ce7] hover:bg-indigo-600 transition">
          Sign Up
        </button>
      </div>
    </div>
  );
}
