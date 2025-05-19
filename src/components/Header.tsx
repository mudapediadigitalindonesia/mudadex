"use client";

import React from "react";
import { ThemeToggle } from "@/app/theme-toggle";

export default function Home() {
  return (
    <div className="navbar sticky top-0 w-full flex justify-between items-center px-12 py-4 z-50 backdrop-blur-sm">
      <img
        src="/images/logo_footer.png"
        alt="Logo"
        className="logo w-[80px] h-[80px]"
      />

      <nav className="flex space-x-6 text-blue-50 dark:text-zinc-950 font-medium relative">
        {/* BuyCrypto */}
        <div className="group relative">
          <a href="#" className="hover:text-blue-900">
            BuyCrypto
          </a>
          <div className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white text-black dark:bg-zinc-900 dark:text-white rounded shadow-md min-w-[160px] z-50 transition-all duration-200">
            <a
              href="#"
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              Credit/Debit Card
            </a>
            <a
              href="#"
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              P2P Trading
            </a>
          </div>
        </div>

        {/* Trade */}
        <div className="group relative">
          <a href="#" className="hover:text-blue-900">
            Trade
          </a>
          <div className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white text-black dark:bg-zinc-900 dark:text-white rounded shadow-md min-w-[160px] z-50 transition-all duration-200">
            <a
              href="#"
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              Convert
            </a>
            <a
              href="#"
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              Spot
            </a>
            <a
              href="#"
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              Futures
            </a>
            <a
              href="#"
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              Options
            </a>
          </div>
        </div>

        {/* Markets (no dropdown) */}
        <a href="#" className="hover:text-blue-900">
          Markets
        </a>

        {/* Earn */}
        <div className="group relative">
          <a href="#" className="hover:text-blue-900">
            Earn
          </a>
          <div className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white text-black dark:bg-zinc-900 dark:text-white rounded shadow-md min-w-[160px] z-50 transition-all duration-200">
            <a
              href="#"
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              Savings
            </a>
            <a
              href="#"
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              Staking
            </a>
            <a
              href="#"
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              Promotions
            </a>
            <a
              href="#"
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              Spotlight
            </a>
          </div>
        </div>

        {/* About */}
        <div className="group relative">
          <a href="#" className="hover:text-blue-900">
            About
          </a>
          <div className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white text-black dark:bg-zinc-900 dark:text-white rounded shadow-md min-w-[160px] z-50 transition-all duration-200">
            <a
              href="#"
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              About Us
            </a>
            <a
              href="#"
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              Agent Contact
            </a>
            <a
              href="#"
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
            >
              Services
            </a>
          </div>
        </div>
      </nav>

      <div className="auth-buttons flex items-center space-x-4 mr-24">
        <ThemeToggle />
        <button className="login px-4 py-2 rounded-md font-semibold text-blue-950 dark:text-blue-50 bg-transparent dark:bg-[#6c5ce7] hover:bg-white hover:text-[#0a0b2c] border border-blue-950 transition dark:border-black">
          Login
        </button>
        <button className="signup px-4 py-2 rounded-md font-semibold text-blue-950 bg-[#6c5ce7] dark:bg-transparent hover:bg-indigo-600 transition dark:border dark:border-blue-950">
          Sign Up
        </button>
      </div>
    </div>
  );
}
