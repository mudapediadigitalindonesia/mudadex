"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon, FaToggleOn, FaToggleOff } from "react-icons/fa";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
        isDark ? "bg-[#6c5ce7]" : "bg-[#6c5ce7]"
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shadow-md transform transition-transform duration-300 ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <FaMoon className="text-blue-600 text-sm" />
        ) : (
          <FaSun className="text-blue-950 text-sm" />
        )}
      </div>
    </button>
  );
}
