"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Scale,
  Droplets,
  Clock,
  Truck,
  DollarSign,
  Check,
  X,
  ArrowDown,
} from "lucide-react";

// Comparison data based on research
const COMPARISON_STATS = [
  {
    label: "Total Weight",
    competitorValue: 70,
    tbfValue: 18,
    suffix: "",
    unit: "lbs",
    icon: Scale,
    tagline: "Lightest commercial-duty vacuum available",
    improvement: "74% lighter",
  },
  {
    label: "Min Water Depth",
    competitorValue: 6,
    tbfValue: 3,
    suffix: "",
    unit: '"',
    icon: Droplets,
    tagline: "Perfect for steps, shallow ends & spas",
    improvement: "50% shallower",
  },
  {
    label: "Setup Time",
    competitorValue: 300,
    tbfValue: 30,
    suffix: "",
    unit: "sec",
    icon: Clock,
    tagline: "Connect and drop in - that's it",
    displayCompetitor: "5:00",
    displayTBF: "0:30",
    improvement: "90% faster",
  },
  {
    label: "Trips from Truck",
    competitorValue: 3,
    tbfValue: 1,
    suffix: "+",
    unit: "",
    icon: Truck,
    tagline: "Carry everything in one hand",
    improvement: "Single trip",
  },
];

const COST_COMPARISON = {
  label: "Total Investment",
  competitorValue: 2500,
  tbfValue: 1535,
  competitorNote: "Battery & charger sold separately",
  tbfNote: "Everything included",
  icon: DollarSign,
  tagline: "Save nearly $1,000",
  savings: 965,
};

const BOOLEAN_FEATURES = [
  {
    label: "Battery & Charger Included",
    competitor: false,
    tbf: true,
    icon: "🔋",
  },
  { label: "One-Hand Carry", competitor: false, tbf: true, icon: "✋" },
  { label: "No Cart Required", competitor: false, tbf: true, icon: "🚫" },
];

// Animated counter hook
function useAnimatedCounter(
  end: number,
  start: number,
  duration: number = 2000,
  isInView: boolean
) {
  const [value, setValue] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    setHasAnimated(true);
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setValue(Math.round(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, hasAnimated, start, end, duration]);

  return value;
}

// Animated progress bar
function AnimatedBar({
  percentage,
  isInView,
  color,
  delay = 0,
}: {
  percentage: number;
  isInView: boolean;
  color: string;
  delay?: number;
}) {
  return (
    <div className="h-3 sm:h-4 bg-gray-800 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
}

// Individual stat card component - REDESIGNED
function StatCard({
  stat,
  index,
}: {
  stat: (typeof COMPARISON_STATS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const animatedValue = useAnimatedCounter(
    stat.tbfValue,
    stat.competitorValue,
    2000,
    isInView
  );

  const Icon = stat.icon;
  const isAnimating = animatedValue !== stat.tbfValue;

  // Calculate bar percentages (TBF is always better/lower, so it gets shorter bar)
  const maxValue = Math.max(stat.competitorValue, stat.tbfValue);
  const competitorPercent = (stat.competitorValue / maxValue) * 100;
  const tbfPercent = (stat.tbfValue / maxValue) * 100;

  // Display value logic
  const displayValue = stat.displayTBF
    ? isAnimating
      ? animatedValue
      : stat.displayTBF
    : animatedValue;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] p-6 sm:p-8 rounded-2xl border border-gray-800 hover:border-[#00B4D8]/30 transition-all duration-300"
    >
      {/* Header with icon and label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#0077B6]/30 to-[#00B4D8]/10 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#00B4D8]" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            {stat.label}
          </h3>
          <span className="text-xs sm:text-sm text-emerald-400 font-semibold">
            {stat.improvement}
          </span>
        </div>
      </div>

      {/* Main comparison - large numbers */}
      <div className="space-y-4 sm:space-y-6">
        {/* Competitor row */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs sm:text-sm uppercase tracking-wider text-red-400/80 font-medium">
              Cart-Based Systems
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-bold text-gray-500 line-through decoration-red-500/50">
                {stat.displayCompetitor || stat.competitorValue}
                {stat.suffix}
              </span>
              <span className="text-sm sm:text-base text-gray-600">
                {stat.unit}
              </span>
            </div>
          </div>
          <AnimatedBar
            percentage={competitorPercent}
            isInView={isInView}
            color="bg-gradient-to-r from-red-600/60 to-red-500/40"
            delay={index * 0.1}
          />
        </div>

        {/* TBF row */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs sm:text-sm uppercase tracking-wider text-[#00B4D8] font-medium">
              The Bottom Feeder
            </span>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-4xl sm:text-5xl lg:text-6xl font-black transition-colors duration-300 ${
                  isAnimating ? "text-white" : "text-[#00B4D8]"
                }`}
              >
                {typeof displayValue === "number"
                  ? displayValue
                  : stat.displayTBF}
              </span>
              <span className="text-lg sm:text-xl text-[#00B4D8]/70 font-semibold">
                {stat.unit}
              </span>
            </div>
          </div>
          <AnimatedBar
            percentage={tbfPercent}
            isInView={isInView}
            color="bg-gradient-to-r from-[#0077B6] to-[#00B4D8]"
            delay={index * 0.1 + 0.2}
          />
        </div>
      </div>

      {/* Tagline */}
      <p className="text-xs sm:text-sm text-gray-400 mt-4 sm:mt-6 italic">
        {stat.tagline}
      </p>
    </motion.div>
  );
}

// Cost comparison card - REDESIGNED
function CostCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const animatedValue = useAnimatedCounter(
    COST_COMPARISON.tbfValue,
    COST_COMPARISON.competitorValue,
    2500,
    isInView
  );

  const Icon = COST_COMPARISON.icon;
  const isAnimating = animatedValue !== COST_COMPARISON.tbfValue;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gradient-to-br from-[#0A2A1A] to-[#1A1A1A] p-6 sm:p-8 lg:p-10 rounded-2xl border border-emerald-900/50"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-600/30 to-emerald-400/10 rounded-xl flex items-center justify-center">
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {COST_COMPARISON.label}
            </h3>
            <span className="text-sm sm:text-base text-emerald-400 font-semibold">
              {COST_COMPARISON.tagline}
            </span>
          </div>
        </div>

        {/* Savings badge */}
        <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 self-start sm:self-auto">
          <span className="text-emerald-400 font-bold text-base sm:text-lg">
            Save ${COST_COMPARISON.savings}
          </span>
        </div>
      </div>

      {/* Price comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Competitor */}
        <div className="bg-black/30 rounded-xl p-4 sm:p-6 border border-red-900/30">
          <div className="text-xs sm:text-sm uppercase tracking-wider text-red-400/80 font-medium mb-2 sm:mb-3">
            Cart-Based Systems
          </div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-500 line-through decoration-red-500/50">
              ${COST_COMPARISON.competitorValue.toLocaleString()}
            </span>
            <span className="text-lg sm:text-xl text-gray-600">+</span>
          </div>
          <div className="flex items-center gap-2 text-red-400/70 text-xs sm:text-sm">
            <X className="w-4 h-4" />
            <span>{COST_COMPARISON.competitorNote}</span>
          </div>
        </div>

        {/* TBF */}
        <div className="bg-gradient-to-br from-emerald-900/30 to-[#0077B6]/20 rounded-xl p-4 sm:p-6 border border-[#00B4D8]/30">
          <div className="text-xs sm:text-sm uppercase tracking-wider text-[#00B4D8] font-medium mb-2 sm:mb-3">
            The Bottom Feeder
          </div>
          <div className="flex items-baseline gap-1 mb-2">
            <span
              className={`text-4xl sm:text-5xl lg:text-6xl font-black transition-colors duration-300 ${
                isAnimating ? "text-white" : "text-[#00B4D8]"
              }`}
            >
              ${animatedValue.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-medium">
            <Check className="w-4 h-4" />
            <span>{COST_COMPARISON.tbfNote}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Boolean features - REDESIGNED
function BooleanFeaturesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] p-6 sm:p-8 rounded-2xl border border-gray-800"
    >
      <h3 className="text-lg sm:text-xl font-bold text-white mb-6 text-center">
        What&apos;s Included
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {BOOLEAN_FEATURES.map((feature, index) => (
          <motion.div
            key={feature.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            className="bg-black/30 rounded-xl p-4 sm:p-5 text-center"
          >
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">
              {feature.icon}
            </div>
            <div className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">
              {feature.label}
            </div>
            <div className="flex justify-center gap-4 sm:gap-6">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500">
                  Others
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </div>
                <span className="text-[10px] sm:text-xs text-emerald-400 font-medium">
                  TBF
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function CompetitorComparison() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-[#00B4D8] text-xs sm:text-sm font-bold tracking-[2px] sm:tracking-[3px] uppercase mb-3 sm:mb-4">
            The Numbers Don&apos;t Lie
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
            Why Pros Choose
            <span className="block text-[#00B4D8]">The Bottom Feeder</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            See how we stack up against cart-based systems like Riptide
          </p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="mt-6 sm:mt-8 text-[#00B4D8]/50"
          >
            <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" />
          </motion.div>
        </motion.div>

        {/* Stats Grid - 2 columns on tablet+, 1 on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {COMPARISON_STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Cost Comparison (full width) */}
        <div className="mb-4 sm:mb-6">
          <CostCard />
        </div>

        {/* Boolean Features */}
        <div className="mb-10 sm:mb-12">
          <BooleanFeaturesCard />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="/products/vacuums"
            className="inline-block bg-gradient-to-r from-[#0077B6] to-[#00B4D8] hover:from-[#006298] hover:to-[#0099B8] text-white font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#00B4D8]/30"
          >
            Get The Bottom Feeder - $1,535
          </a>
          <p className="text-gray-500 text-xs sm:text-sm mt-4 sm:mt-6">
            1-Year Limited Warranty • Free Shipping on Orders $500+ • Made in
            USA
          </p>
        </motion.div>
      </div>
    </section>
  );
}
