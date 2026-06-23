import { College } from "@/types/college";
import collegesData from "@/data/colleges.json";
import Link from "next/link";
import {
  ArrowLeft, Star, MapPin, Building2, Calendar,
  Trophy, Briefcase, GraduationCap, CheckCircle, TrendingUp, Users, BookOpen
} from "lucide-react";
import CompareActionButton from "@/components/CompareActionButton";

const TYPE_BANNER: Record<string, string> = {
  IIT: "from-primary to-secondary",
  NIT: "from-secondary to-accent",
  Private: "from-accent to-primary",
  Public: "from-secondary to-primary",
};

function getBannerGradient(type: string, shortName: string) {
  const key = Object.keys(TYPE_BANNER).find((k) => type.includes(k) || shortName.includes(k));
  return key ? TYPE_BANNER[key] : "from-slate-600 via-slate-700 to-slate-800";
}

export default async function CollegeDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const colleges: College[] = collegesData as College[];
  const college = colleges.find((c) => c.id === parseInt(id));

  if (!college) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center shrink-0">
          <Building2 className="w-10 h-10 sm:w-14 sm:h-14 text-[#312E81] dark:text-[#F59E0B]" />
        </div>
        <h1 className="text-3xl font-black text-foreground mb-3">College Not Found</h1>
        <p className="text-muted mb-8 text-center max-w-md">
          We couldn&apos;t find the college you&apos;re looking for. It may have been removed or the ID is incorrect.
        </p>
        <Link
          href="/"
          className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 inline-flex items-center gap-2 hover:scale-[1.02] transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>
    );
  }

  const bannerGradient = getBannerGradient(college.type, college.shortName);

  return (
    <div className="min-h-screen bg-background font-sans">
      
      {/* ── Hero Banner ── */}
      <div className={`relative bg-gradient-to-br ${bannerGradient} overflow-hidden`}>
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Top blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {/* Nav */}
          <div className="flex items-center justify-between mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Colleges
            </Link>
            <CompareActionButton college={college} />
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold border border-white/30 backdrop-blur-sm">
              {college.type}
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold border border-white/30 backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              {college.rating} Rating
            </div>
            {college.nirf && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold border border-white/30 backdrop-blur-sm">
                <Trophy className="w-3.5 h-3.5" />
                NIRF #{college.nirf}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-2">
            {college.name}
          </h1>
          <p className="text-white/70 text-lg font-medium mb-8">{college.shortName}</p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <MapPin className="w-4 h-4 text-white/60" /> {college.location}
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <Calendar className="w-4 h-4 text-white/60" /> Est. {college.established}
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <CheckCircle className="w-4 h-4 text-white/60" /> {college.examsAccepted.join(", ")}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 -mt-6">

        {/* ── Placement Stats ── */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-black text-foreground">Placement Insights</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Average Package",
                value: college.placements.averagePackage,
                icon: TrendingUp,
              },
              { label: "Highest Package", value: college.placements.highestPackage, icon: Trophy },
              { label: "Placement Rate", value: college.placements.placementRate, icon: CheckCircle },
              {
                label: "Top Recruiters",
                value: null,
                recruiters: college.placements.topRecruiters,
                icon: Users,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gradient-to-br from-primary to-secondary rounded-2xl border border-primary/20 p-5 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 mb-4">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm font-semibold text-white/80 mb-1.5">{stat.label}</p>
                {stat.value ? (
                  <p className="text-xl font-black text-white">{stat.value}</p>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {stat.recruiters?.slice(0, 3).map((r, i) => (
                      <span key={i} className="text-xs bg-white/10 text-white border border-white/10 px-2 py-0.5 rounded-md font-semibold">
                        {r}
                      </span>
                    ))}
                    {(stat.recruiters?.length ?? 0) > 3 && (
                      <span className="text-xs bg-white/10 text-indigo-200 border border-white/10 px-2 py-0.5 rounded-md font-semibold">
                        +{(stat.recruiters?.length ?? 0) - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Overview ── */}
        <div className="bg-card/80 rounded-3xl border border-border p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-black text-foreground">Overview</h2>
          </div>
          <p className="text-foreground leading-relaxed text-base">{college.overview}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {college.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-card text-sm font-semibold text-foreground border border-border">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Courses ── */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-black text-foreground">Available Courses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {college.courses.map((course, i) => (
              <div
                key={i}
                className="group bg-card/80 rounded-2xl border border-border p-5 shadow-sm hover:shadow-lg hover:shadow-accent/5 hover:border-accent transition-all duration-300"
              >
                <h3 className="text-base font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {course.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-muted">
                    <Calendar className="w-3.5 h-3.5" />
                    {course.duration}
                  </div>
                  <span className="text-sm font-black text-accent bg-accent/10 px-3 py-1 rounded-xl border border-accent/20">
                    {course.fees}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Reviews ── */}
        {college.reviews && college.reviews.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Star className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-black text-foreground">Student Reviews</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {college.reviews.map((review, i) => (
                <div
                  key={i}
                  className="relative bg-card/80 rounded-2xl border border-border p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Quotemark */}
                  <span className="absolute top-4 right-5 text-5xl text-accent/20 font-serif leading-none select-none">&quot;</span>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-bold text-foreground">{review.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-bold text-foreground">{review.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-muted text-sm leading-relaxed italic flex-1">&quot;{review.comment}&quot;</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
