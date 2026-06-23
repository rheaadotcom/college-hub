"use client";

import { Search, MapPin, Building2, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  ratingFilter: string;
  setRatingFilter: (rating: string) => void;
  availableLocations: string[];
}

const QUICK_TYPES = ["IIT", "NIT", "Private", "Public"];

export default function SearchBar({
  searchQuery, setSearchQuery,
  locationFilter, setLocationFilter,
  typeFilter, setTypeFilter,
  ratingFilter, setRatingFilter,
  availableLocations,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const hasFilters = searchQuery || locationFilter || typeFilter || ratingFilter;

  const clearAll = () => {
    setSearchQuery("");
    setLocationFilter("");
    setTypeFilter("");
    setRatingFilter("");
  };

  return (
    <div className="space-y-4">
      {/* Floating search container */}
      <motion.div
        layout
        className={`relative bg-card/60 rounded-2xl border transition-all duration-300 ${focused ? "border-accent shadow-accent/15 ring-2 ring-accent/20" : "border-border shadow-sm"} backdrop-blur-xl overflow-hidden`}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4">
          <motion.div
            animate={{ rotate: focused ? 15 : 0, scale: focused ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Search className={`h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
              focused ? "text-accent" : "text-muted"
            }`} />
          </motion.div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search colleges by name, short name, or location…"
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder-muted text-base font-medium"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-full bg-muted/20 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mx-5" />

        {/* Dropdowns row */}
        <div className="flex flex-col sm:flex-row gap-0 sm:divide-x sm:divide-border">
          {/* Location */}
          <div className="relative flex-1 group">
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 bg-transparent text-sm text-foreground border-none outline-none appearance-none cursor-pointer hover:bg-muted/10 transition-colors font-medium"
            >
              <option value="">All Locations</option>
              {availableLocations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div className="relative flex-1 group">
            <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 bg-transparent text-sm text-foreground border-none outline-none appearance-none cursor-pointer hover:bg-muted/10 transition-colors font-medium"
            >
              <option value="">All Types</option>
              <option value="IIT">IIT</option>
              <option value="NIT">NIT</option>
              <option value="Private">Private</option>
              <option value="Public">Government</option>
            </select>
          </div>

          {/* Rating */}
          <div className="relative flex-1 group">
            <Star className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 bg-transparent text-sm text-foreground border-none outline-none appearance-none cursor-pointer hover:bg-muted/10 transition-colors font-medium"
            >
              <option value="">Any Rating</option>
              <option value="4.8">4.8 & Above</option>
              <option value="4.5">4.5 & Above</option>
              <option value="4.0">4.0 & Above</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Quick Filter Pills + Clear */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground mr-1">Quick:</span>
        {QUICK_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(typeFilter === type ? "" : type)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
              typeFilter === type
                ? "bg-ocean-gradient text-white border-transparent shadow-sm shadow-accent/30"
                : "bg-card/50 text-muted border-border hover:border-accent/50 hover:text-accent transition-colors"
            }`}
          >
            {type}
          </button>
        ))}

        <AnimatePresence>
          {hasFilters && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={clearAll}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-accent bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-colors"
            >
              <X className="w-3 h-3" /> Clear filters
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
