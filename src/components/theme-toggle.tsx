"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newTheme: string) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center justify-center rounded-xl w-10 h-10 border border-slate-200 bg-white hover:bg-slate-100 dark:border-slate-800 dark:bg-[#0F172A] dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-[#020617]"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-slate-800 dark:text-slate-200" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-slate-800 dark:text-slate-200" />
        <span className="sr-only">Toggle theme</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-36 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-800 dark:bg-[#0F172A] z-50"
          >
            <button
              onClick={() => handleSelect("light")}
              className={`w-full flex items-center rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 ${
                theme === "light" ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20" : "text-slate-700 dark:text-slate-200"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => handleSelect("dark")}
              className={`w-full flex items-center rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 ${
                theme === "dark" ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20" : "text-slate-700 dark:text-slate-200"
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => handleSelect("system")}
              className={`w-full flex items-center rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 ${
                theme === "system" ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20" : "text-slate-700 dark:text-slate-200"
              }`}
            >
              System
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
