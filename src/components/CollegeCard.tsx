"use client";

import { College } from "@/types/college";
import { Star, MapPin, Trophy, Plus, Check, ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { motion } from "framer-motion";
import { useRef } from "react";

interface CollegeCardProps {
  college: College;
}

const TYPE_STYLES: Record<string, string> = {
  IIT: "bg-primary/10 text-primary border-primary/20 dark:bg-primary/30 dark:text-accent dark:border-primary/50",
  NIT: "bg-secondary/10 text-secondary border-secondary/20 dark:bg-secondary/30 dark:text-secondary dark:border-secondary/50",
  Private: "bg-accent/10 text-accent border-accent/20 dark:bg-accent/30 dark:text-accent dark:border-accent/50",
  Public: "bg-muted/10 text-muted border-muted/20 dark:bg-muted/20 dark:text-muted dark:border-muted/30",
};

const TYPE_BANNER: Record<string, string> = {
  IIT: "from-primary to-secondary",
  NIT: "from-secondary to-accent",
  Private: "from-accent to-primary",
  Public: "from-secondary to-primary",
};

function getBannerGradient(type: string) {
  return TYPE_BANNER[type] ?? "from-slate-600 via-slate-700 to-slate-800";
}

function getTypeStyle(type: string) {
  return TYPE_STYLES[type] ?? "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const { addCollege, removeCollege, isComparing, selectedColleges } = useCompare();
  const comparing = isComparing(college.id);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (comparing) {
      removeCollege(college.id);
    } else {
      if (selectedColleges.length >= 3) {
        alert("You can only compare up to 3 colleges at a time.");
        return;
      }
      addCollege(college);
    }
  };

  // Spotlight follow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--x", `${x}%`);
    cardRef.current.style.setProperty("--y", `${y}%`);
  };

  const collegeType = Object.keys(TYPE_BANNER).find((k) => college.type.includes(k) || college.shortName.includes(k)) ?? college.type;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="spotlight-card flex flex-col h-full rounded-3xl border border-border bg-card shadow-lg shadow-primary/10 hover:shadow-2xl hover:shadow-accent/20 hover:border-accent transition-all duration-300 overflow-hidden group"
    >
      {/* Gradient banner */}
      <div className={`h-28 bg-gradient-to-br ${getBannerGradient(collegeType)} relative overflow-hidden flex-shrink-0`}>
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <div className="flex flex-col gap-2">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-white shadow-sm shadow-primary/30`}>
              {college.type}
            </span>
            {college.nirf && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-500 text-white shadow-sm shadow-amber-500/30 w-fit">
                <Trophy className="w-3 h-3" />
                NIRF #{college.nirf}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 bg-white/20 dark:bg-slate-900/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/30 dark:border-slate-700/50">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span className="text-xs font-bold text-white">{college.rating}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <Link href={`/college/${college.id}`} className="flex-1 flex flex-col p-5 pb-4 gap-0">
        <h2 className="text-lg font-black text-foreground leading-snug group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-1">
          {college.shortName}
        </h2>
        <p className="text-xs text-muted mt-0.5 line-clamp-1 mb-4">{college.name}</p>

        <div className="space-y-2.5 mt-auto">
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="truncate">{college.location}</span>
          </div>

          {/* Fees */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted font-medium">Annual Fees</span>
            <span className="text-sm font-bold text-foreground">{college.fees}</span>
          </div>

          {/* Avg Package */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted font-medium flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-accent" /> Avg Package
            </span>
            <span className="text-sm font-bold text-accent">{college.placements.averagePackage}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {college.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
            >
              {tag}
            </span>
          ))}
          {college.tags.length > 3 && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
              +{college.tags.length - 3}
            </span>
          )}
        </div>
      </Link>

      {/* Footer */}
      <div className="px-5 py-3.5 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between gap-3 bg-background/50">
        <Link
          href={`/college/${college.id}`}
          className="flex items-center gap-1.5 text-sm font-semibold text-primary dark:text-accent hover:text-indigo-800 transition-colors group/link"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>

        <button
          onClick={handleCompareClick}
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all duration-200 ${
            comparing
              ? "bg-accent text-white border-accent shadow-sm shadow-accent/30 hover:bg-secondary"
              : "bg-card text-muted border-border hover:border-accent hover:text-accent transition-colors"
          }`}
        >
          {comparing ? (
            <><Check className="w-3.5 h-3.5" /> Added</>
          ) : (
            <><Plus className="w-3.5 h-3.5" /> Compare</>
          )}
        </button>
      </div>
    </motion.div>
  );
}
