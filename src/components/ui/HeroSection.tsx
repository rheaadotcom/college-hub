"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Menu, X, ArrowRight, GitCompare, Star,
  Trophy, TrendingUp, Search, CheckCircle,
  GraduationCap, Building2, Award,
  ChevronRight, Briefcase
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { label: "Discover", href: "/" },
  { label: "Compare", href: "/compare" },
  { label: "Rankings", href: "/#explore" },
  { label: "About", href: "/" },
];

const TRUSTED_COLLEGES = [
  { name: "IIT Bombay", location: "Mumbai", rating: 4.9, rank: 3 },
  { name: "IIT Delhi", location: "New Delhi", rating: 4.8, rank: 2 },
  { name: "IIT Madras", location: "Chennai", rating: 4.9, rank: 1 },
  { name: "BITS Pilani", location: "Rajasthan", rating: 4.8, rank: 26 },
  { name: "NIT Trichy", location: "Tamil Nadu", rating: 4.6, rank: 8 },
];

const STAT_BADGES = [
  { icon: Building2, label: "20+ Colleges", color: "from-primary to-secondary", bg: "bg-primary/10 border-primary/20" },
  { icon: Briefcase, label: "Placement Insights", color: "from-secondary to-accent", bg: "bg-secondary/10 border-secondary/20" },
  { icon: Trophy, label: "NIRF Rankings", color: "from-accent to-primary", bg: "bg-accent/10 border-accent/20" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden bg-background font-sans transition-colors duration-300"
    >
      {/* ── Background: animated blobs + grid ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 119, 182, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 119, 182, 0.2) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Blob 1 */}
        <div className="animate-blob absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[96px]" />
        {/* Blob 2 */}
        <div className="animate-blob animation-delay-2000 absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-secondary/15 blur-[80px]" />
        {/* Blob 3 */}
        <div className="animate-blob animation-delay-4000 absolute -bottom-32 left-1/3 w-[360px] h-[360px] rounded-full bg-primary/10 blur-[80px]" />
        {/* Radial centre glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-accent/10 via-transparent to-transparent blur-3xl" />
      </div>

      {/* ── Floating Navbar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2 bg-card/60 backdrop-blur-2xl shadow-lg shadow-primary/5 border-b border-border"
            : "py-4 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl bg-ocean-gradient flex items-center justify-center shadow-lg shadow-accent/30 group-hover:shadow-accent/50 transition-shadow">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-xl tracking-tight text-foreground">
                College<span className="text-accent">Hub</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-accent hover:bg-accent/10 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Dark mode toggle */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              <Link
                href="/#explore"
                className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-secondary shadow-md shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex w-9 h-9 items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden overflow-hidden bg-card/95 backdrop-blur-2xl border-b border-border/60"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-accent/10 hover:text-accent transition-all"
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>
                ))}
                <div className="pt-2 flex gap-3">
                  <div className="flex-1 flex justify-center">
                    <ThemeToggle />
                  </div>
                  <Link
                    href="/#explore"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl bg-primary hover:bg-secondary text-sm font-semibold text-white shadow-md"
                  >
                    Get Started <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Hero Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Text ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            {/* Trust pill */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent dark:text-muted text-sm font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" />
                Trusted by 10,000+ Students
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl xl:text-7xl font-black text-primary dark:text-white tracking-tight leading-[1.05] mb-6"
            >
              Discover Your{" "}
              <span className="relative inline-block">
                <span className="text-ocean-gradient">
                  Dream College
                </span>
                {/* underline accent */}
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-ocean-gradient opacity-60" />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-foreground/80 dark:text-foreground/80 leading-relaxed mb-8 max-w-[480px]"
            >
              Explore India's top colleges, compare placements, rankings, fees and make informed career decisions through a beautiful modern experience.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/#explore"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white bg-primary hover:bg-secondary shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              >
                Explore Colleges
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/compare"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-primary dark:text-white bg-white/10 border border-primary/10 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] backdrop-blur-xl shadow-sm"
              >
                <GitCompare className="w-5 h-5 text-primary dark:text-accent" />
                Compare Colleges
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5">
              {[
                "20+ Top Colleges",
                "Updated Placement Insights",
                "Smart Comparison Tools",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Premium Dashboard Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:block"
            style={{ perspective: "1200px" }}
          >
            {/* Main card */}
            <div className="relative rounded-3xl border border-border bg-card/60 backdrop-blur-3xl shadow-2xl shadow-primary/20 overflow-hidden p-5 space-y-4">
              {/* Toolbar dots */}
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-3 h-3 rounded-full bg-red-400/80" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                <div className="ml-auto text-xs text-muted font-medium flex items-center gap-1">
                  <Search className="w-3 h-3" /> collegehub.in
                </div>
              </div>

              {/* Search bar mock */}
              <div className="flex items-center gap-3 bg-card/80 rounded-2xl px-4 py-3 border border-border shadow-sm">
                <Search className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm text-muted">Search IIT, NIT, BITS…</span>
                <span className="ml-auto text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-bold border border-accent/20">20+</span>
              </div>

              {/* Quick filters */}
              <div className="flex gap-2 flex-wrap">
                {["All", "IIT", "NIT", "Private"].map((f, i) => (
                  <span
                    key={f}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      i === 0
                        ? "bg-ocean-gradient text-white shadow-sm shadow-accent/30"
                        : "bg-card/80 border border-border text-foreground"
                    }`}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* College rows */}
              {[
                { name: "IIT Bombay", rank: 3, rating: 4.9, pkg: "₹25 LPA", type: "IIT", color: "from-primary to-secondary" },
                { name: "IIT Delhi", rank: 2, rating: 4.8, pkg: "₹22 LPA", type: "IIT", color: "from-secondary to-accent" },
                { name: "BITS Pilani", rank: 26, rating: 4.8, pkg: "₹20 LPA", type: "Private", color: "from-accent to-primary" },
              ].map((college, i) => (
                <motion.div
                  key={college.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="flex items-center gap-3 bg-card/60 rounded-2xl px-4 py-3 border border-border hover:border-accent/40 shadow-sm hover:shadow-md transition-all group cursor-default"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${college.color} flex items-center justify-center shadow-sm shrink-0`}>
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{college.name}</p>
                    <p className="text-xs text-muted">Rank #{college.rank} · {college.type}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-accent">{college.pkg}</p>
                    <div className="flex items-center gap-0.5 justify-end">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <span className="text-xs font-semibold text-foreground">{college.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                {[
                  { label: "Avg Package", value: "₹18 LPA", icon: TrendingUp, color: "text-secondary bg-secondary/10" },
                  { label: "Top Ranked", value: "#1 NIRF", icon: Trophy, color: "text-accent bg-accent/10" },
                  { label: "Placement", value: "95%+", icon: CheckCircle, color: "text-secondary bg-secondary/10" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-card/40 p-3 flex flex-col items-center gap-1.5 border border-border">
                    <div className={`p-1.5 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-base font-black text-foreground">{stat.value}</p>
                    <p className="text-[10px] text-muted text-center leading-none">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge: Placement */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-8 bg-card rounded-2xl px-4 py-3 shadow-xl border border-border flex items-center gap-3 backdrop-blur-xl"
            >
              <div className="w-9 h-9 rounded-xl bg-ocean-gradient flex items-center justify-center shadow-sm">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-foreground">95%</p>
                <p className="text-[10px] text-muted font-medium">Placement Rate</p>
              </div>
            </motion.div>

            {/* Floating badge: NIRF */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-8 bg-card rounded-2xl px-4 py-3 shadow-xl border border-border flex items-center gap-3 backdrop-blur-xl"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-sm">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-foreground">NIRF #1</p>
                <p className="text-[10px] text-muted font-medium">Top Ranked College</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stat Badges (mobile-visible) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-16 flex flex-wrap justify-center gap-4 lg:hidden"
        >
          {STAT_BADGES.map((badge) => (
            <motion.div
              key={badge.label}
              variants={itemVariants}
              className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl border ${badge.bg} backdrop-blur-sm`}
            >
              <div className={`p-1.5 rounded-lg bg-gradient-to-br ${badge.color}`}>
                <badge.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Trusted Institutions ── */}
      <div className="relative z-10 border-t border-border bg-card/30 backdrop-blur-sm py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-xs font-bold text-muted uppercase tracking-[0.2em] mb-8"
          >
            Top Institutions on CollegeHub
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
            {TRUSTED_COLLEGES.map((college, i) => (
              <motion.div
                key={college.name}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.07 * i, ease: "easeOut" }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative bg-card rounded-2xl border border-border px-5 py-4 shadow-sm hover:shadow-xl hover:shadow-accent/10 hover:border-accent/50 transition-all duration-300 cursor-default"
              >
                {/* Rank badge */}
                <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-ocean-gradient text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                  #{college.rank}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-all">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground whitespace-nowrap">{college.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <span className="text-xs font-semibold text-muted">{college.rating}</span>
                      <span className="text-xs text-muted">· {college.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
