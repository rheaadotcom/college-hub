"use client";

import { useState, useMemo } from "react";
import { College } from "@/types/college";
import collegesData from "@/data/colleges.json";
import CollegeCard from "@/components/CollegeCard";
import SearchBar from "@/components/SearchBar";
import HeroSection from "@/components/ui/HeroSection";
import { Building2, Star, Trophy, SearchX, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export default function Home() {
  const colleges: College[] = collegesData as College[];

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const availableLocations = useMemo(() => {
    const locs = colleges.map((c) => c.location);
    return Array.from(new Set(locs)).sort();
  }, [colleges]);

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        college.name.toLowerCase().includes(q) ||
        college.shortName.toLowerCase().includes(q) ||
        college.location.toLowerCase().includes(q);
      const matchesLocation = locationFilter === "" || college.location === locationFilter;
      let matchesType = true;
      if (typeFilter === "IIT") matchesType = college.shortName.includes("IIT");
      else if (typeFilter === "NIT") matchesType = college.shortName.includes("NIT");
      else if (typeFilter === "Private") matchesType = college.type === "Private";
      else if (typeFilter === "Public") matchesType = college.type === "Public";
      let matchesRating = true;
      if (ratingFilter !== "") matchesRating = college.rating >= parseFloat(ratingFilter);
      return matchesSearch && matchesLocation && matchesType && matchesRating;
    });
  }, [colleges, searchQuery, locationFilter, typeFilter, ratingFilter]);

  const stats = useMemo(() => {
    const total = filteredColleges.length;
    if (total === 0) return { total: 0, avgRating: "0.0", topRated: "N/A", avgPackage: "N/A" };
    const avgRating = (filteredColleges.reduce((acc, c) => acc + c.rating, 0) / total).toFixed(1);
    const topCollege = filteredColleges.reduce((prev, cur) => (prev.rating > cur.rating ? prev : cur));
    return { total, avgRating, topRated: topCollege.shortName, avgPackage: topCollege.placements.averagePackage };
  }, [filteredColleges]);


  const STAT_CARDS = [
    {
      label: "Total Colleges",
      value: stats.total,
      icon: Building2,
      gradient: "from-primary to-secondary",
      bg: "bg-primary",
      text: "text-accent",
    },
    {
      label: "Average Rating",
      value: stats.avgRating,
      icon: Star,
      gradient: "from-primary to-secondary",
      bg: "bg-primary",
      text: "text-accent",
    },
    {
      label: "Top Rated",
      value: stats.topRated,
      icon: Trophy,
      gradient: "from-primary to-secondary",
      bg: "bg-primary",
      text: "text-accent",
    },
    {
      label: "Best Avg Package",
      value: stats.avgPackage,
      icon: TrendingUp,
      gradient: "from-primary to-secondary",
      bg: "bg-primary",
      text: "text-accent",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <HeroSection />

      <div id="explore" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* ── Stats Grid ── */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {STAT_CARDS.map((card) => (
              <motion.div
                key={card.label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
                }}
                whileHover={{ y: -3 }}
                className="bg-gradient-to-br from-primary to-secondary rounded-2xl border border-primary/20 dark:border-primary/30 p-5 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10`}>
                    <card.icon className={`w-6 h-6 ${card.text}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary/80 mb-0.5">{card.label}</p>
                    <p className="text-2xl font-black text-white">{card.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Search ── */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
            availableLocations={availableLocations}
          />

          {/* ── Results header ── */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-foreground">
                {filteredColleges.length > 0 ? (
                  <>
                    <span className="text-ocean-gradient">{filteredColleges.length}</span>{" "}
                    {filteredColleges.length === 1 ? "College" : "Colleges"} Found
                  </>
                ) : "No Results"}
              </h2>
              <p className="text-sm text-muted mt-0.5">
                {filteredColleges.length > 0
                  ? "Click any card to explore full details"
                  : "Try adjusting your search or filters"}
              </p>
            </div>
          </div>

          {/* ── College Grid ── */}
          {filteredColleges.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-24 px-8 bg-card/60 backdrop-blur-md rounded-3xl border border-border shadow-sm"
            >
              <div className="w-20 h-20 rounded-2xl bg-card/10 dark:bg-card/30 flex items-center justify-center mb-6">
                <SearchX className="w-10 h-10 text-muted" />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-2">No Colleges Found</h3>
              <p className="text-muted max-w-sm leading-relaxed mb-8">
                We couldn't find colleges matching your current filters. Try broadening your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setLocationFilter("");
                  setTypeFilter("");
                  setRatingFilter("");
                }}
                className="px-8 py-3.5 bg-ocean-gradient text-white font-bold rounded-2xl shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-[1.02] active:scale-[0.97] transition-all"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
