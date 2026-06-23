"use client";

import { useCompare } from "@/context/CompareContext";
import { GitCompare, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CompareFloatingButton() {
  const { selectedColleges, clearComparison } = useCompare();
  const pathname = usePathname();

  const show = selectedColleges.length >= 2 && pathname !== "/compare";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        >
          {/* Clear button */}
          <button
            onClick={clearComparison}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-card border border-slate-200 dark:border-slate-700 text-muted shadow-lg hover:text-rose-500 dark:hover:text-rose-400 hover:border-rose-300 dark:hover:border-rose-700 transition-all hover:scale-105 active:scale-95"
            title="Clear comparison"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Compare button */}
          <Link
            href="/compare"
            className="flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 font-bold text-sm transition-all hover:scale-[1.04] active:scale-[0.97]"
          >
            <GitCompare className="w-4 h-4" />
            Compare ({selectedColleges.length})
            {/* Dot indicators */}
            <span className="flex gap-1 ml-1">
              {selectedColleges.map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/70" />
              ))}
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
