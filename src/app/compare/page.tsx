"use client";

import { useCompare } from "@/context/CompareContext";
import {
  ArrowLeft, Trash2, Building2, MapPin, Star, Trophy,
  Calendar, Briefcase, TrendingUp, CheckCircle, Plus, GraduationCap
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { College } from "@/types/college";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const TYPE_GRAD: Record<string, string> = {
  IIT: "from-primary to-secondary",
  NIT: "from-secondary to-accent",
  Private: "from-accent to-primary",
  Public: "from-secondary to-primary",
};

function getGrad(college: College) {
  const key = Object.keys(TYPE_GRAD).find((k) => college.type.includes(k) || college.shortName.includes(k));
  return key ? TYPE_GRAD[key] : "from-slate-600 via-slate-700 to-slate-800";
}

// Helper to check if a value is best (highest number for packages, lowest for fees, highest for rating/nirf)
function getBestPlacements(colleges: College[]) {
  const bestAvg = colleges.reduce((best, c) => {
    const val = parseFloat(c.placements.averagePackage.replace(/[^0-9.]/g, ""));
    const bval = parseFloat(best.placements.averagePackage.replace(/[^0-9.]/g, ""));
    return val > bval ? c : best;
  });
  const bestRating = colleges.reduce((best, c) => (c.rating > best.rating ? c : best));
  const bestNirf = colleges.filter((c) => c.nirf).reduce((best, c) => (c.nirf! < best.nirf! ? c : best), colleges[0]);

  return { bestAvgId: bestAvg.id, bestRatingId: bestRating.id, bestNirfId: bestNirf?.id };
}

export default function ComparePage() {
  const { selectedColleges, removeCollege, clearComparison } = useCompare();
  const router = useRouter();

  if (selectedColleges.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 shadow-inner">
            <GraduationCap className="w-12 h-12 text-accent" />
          </div>
          <h1 className="text-3xl font-black text-foreground mb-3">No Colleges Selected</h1>
          <p className="text-muted mb-8 max-w-md leading-relaxed">
            You haven't selected any colleges to compare. Go back to the homepage and select up to 3 colleges using the Compare button.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-ocean-gradient text-white font-bold rounded-2xl shadow-xl shadow-accent/20 hover:shadow-accent/40 hover:scale-[1.02] active:scale-[0.97] transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Browse Colleges
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleClear = () => {
    clearComparison();
    router.push("/");
  };

  const { bestAvgId, bestRatingId, bestNirfId } = getBestPlacements(selectedColleges);

  return (
    <div className="min-h-screen bg-background font-sans">

      {/* ── Page Header ── */}
      <div className="bg-card/90 border-b border-border sticky top-0 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <div className="w-px h-5 bg-border" />
            <div>
              <h1 className="text-lg font-black text-foreground">Compare Colleges</h1>
              <p className="text-xs font-semibold text-muted">Side-by-side analysis</p>
            </div>
          </div>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50 text-sm font-bold hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* ── College Cards Row ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="grid gap-6 pb-6" style={{ gridTemplateColumns: `repeat(${selectedColleges.length}, minmax(0, 1fr))` }}>
            {selectedColleges.map((college, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={college.id}
                className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden relative"
              >
              {/* Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                {college.id === bestRatingId && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-500 text-white shadow-sm">
                    ⭐ Best Rating
                  </span>
                )}
                {college.id === bestAvgId && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-500 text-white shadow-sm ml-auto">
                    🏆 Best Placement
                  </span>
                )}
                {college.id === bestNirfId && college.id !== bestRatingId && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-indigo-500 text-white shadow-sm">
                    🏅 Top Ranked
                  </span>
                )}
              </div>

              {/* Banner */}
              <div className={`h-28 bg-gradient-to-br ${getGrad(college)} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              </div>

              <div className="p-5 -mt-4">
                <div className="w-14 h-14 rounded-2xl bg-card border-2 border-border shadow-lg flex items-center justify-center mb-3">
                  <Building2 className="w-7 h-7 text-primary dark:text-accent" />
                </div>
                <h2 className="text-lg font-black text-foreground leading-tight">{college.shortName}</h2>
                <p className="text-xs text-muted mt-0.5 line-clamp-1">{college.name}</p>
                <button
                  onClick={() => removeCollege(college.id)}
                  className="absolute top-[132px] right-4 p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Empty slot(s) */}
          {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => (
            <motion.div
              key={`empty-${i}`}
              variants={cardVariants}
            >
              <Link
                href="/"
                className="flex flex-col items-center justify-center h-full min-h-[220px] rounded-3xl border-2 border-dashed border-border text-muted hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 p-8 text-center gap-3"
              >
                <div className="w-12 h-12 rounded-2xl border-2 border-current flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm">Add a College</p>
                  <p className="text-xs mt-0.5 opacity-60">Browse and compare more</p>
                </div>
              </Link>
            </motion.div>
          ))}

        </div>
        </motion.div>

        {/* ── Comparison Attribute Sections ── */}
        {[
          {
            title: "Location & Type",
            icon: MapPin,
            rows: [
              { label: "Location", render: (c: College) => c.location },
              { label: "Type", render: (c: College) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 dark:bg-primary/30 text-primary dark:text-foreground border border-primary/20 dark:border-primary/50">
                  {c.type}
                </span>
              )},
              { label: "Established", render: (c: College) => c.established },
            ],
          },
          {
            title: "Rankings & Rating",
            icon: Trophy,
            rows: [
              { label: "Rating", render: (c: College) => (
                <span className={`flex items-center gap-1 font-black text-lg ${c.id === bestRatingId ? "text-accent" : "text-muted"}`}>
                  <Star className="w-4 h-4 fill-accent text-accent" />{c.rating}
                  {c.id === bestRatingId && <span className="text-xs font-bold text-accent ml-1">BEST</span>}
                </span>
              )},
              { label: "NIRF Rank", render: (c: College) => (
                <span className={`font-bold ${c.id === bestNirfId ? "text-primary" : "text-foreground"}`}>
                  {c.nirf ? `#${c.nirf}` : "N/A"}
                  {c.id === bestNirfId && c.nirf && <span className="ml-2 text-xs font-black text-primary">BEST</span>}
                </span>
              )},
            ],
          },
          {
            title: "Fees",
            icon: Calendar,
            rows: [
              { label: "Annual Fees", render: (c: College) => <span className="font-black text-foreground">{c.fees}</span> },
            ],
          },
          {
            title: "Placements",
            icon: Briefcase,
            rows: [
              { label: "Average Package", render: (c: College) => (
                <span className={`font-black text-lg ${c.id === bestAvgId ? "text-accent" : "text-muted"}`}>
                  {c.placements.averagePackage}
                  {c.id === bestAvgId && <span className="ml-2 text-xs text-accent">BEST</span>}
                </span>
              )},
              { label: "Highest Package", render: (c: College) => <span className="font-bold text-foreground">{c.placements.highestPackage}</span> },
              { label: "Placement Rate", render: (c: College) => (
                <span className="font-bold text-foreground flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> {c.placements.placementRate}
                </span>
              )},
            ],
          },
        ].map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-2 mb-3">
              <section.icon className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-black text-foreground uppercase tracking-wider">{section.title}</h2>
            </div>
            <div className="bg-card/80 rounded-2xl border border-border overflow-hidden shadow-sm">
              {section.rows.map((row, ri) => (
                <div
                  key={row.label}
                  className={`flex ${ri !== 0 ? "border-t border-border" : ""}`}
                >
                  <div className="w-36 sm:w-44 shrink-0 px-5 py-4 bg-card/40 text-xs font-bold text-muted flex items-center">
                    {row.label}
                  </div>
                  <div className="flex flex-1 divide-x divide-border">
                    {selectedColleges.map((college) => (
                      <div key={college.id} className="flex-1 px-5 py-4 text-sm">
                        {row.render(college)}
                      </div>
                    ))}
                    {Array.from({ length: 3 - selectedColleges.length }).map((_, i) => (
                      <div key={i} className="flex-1 px-5 py-4 bg-card/20" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ── Mobile stacked view ── */}
        <div className="lg:hidden">
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-4">Scroll up to see the detailed comparison</p>
        </div>

      </div>
    </div>
  );
}
