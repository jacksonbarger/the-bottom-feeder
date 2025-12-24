"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Scale, Droplets, Clock, Truck, DollarSign, Check, X } from "lucide-react";

// Comparison data based on research
const COMPARISON_STATS = [
  {
    label: "Total Weight",
    competitorValue: 70,
    tbfValue: 18,
    suffix: " lbs",
    icon: Scale,
    tagline: "Lightest commercial-duty vacuum available",
  },
  {
    label: "Min Water Depth",
    competitorValue: 6,
    tbfValue: 3,
    suffix: '"',
    icon: Droplets,
    tagline: "Perfect for steps, shallow ends & spas",
  },
  {
    label: "Setup Time",
    competitorValue: 300,
    tbfValue: 30,
    suffix: " sec",
    displayCompetitor: "5 min",
    icon: Clock,
    tagline: "Connect and drop in - that's it",
  },
  {
    label: "Trips from Truck",
    competitorValue: 3,
    tbfValue: 1,
    suffix: "",
    competitorSuffix: "+",
    icon: Truck,
    tagline: "Carry everything in one hand",
  },
];

const COST_COMPARISON = {
  label: "Total Investment",
  competitorValue: 2500,
  tbfValue: 1535,
  competitorNote: "Battery & charger sold separately",
  tbfNote: "Everything included",
  icon: DollarSign,
  tagline: "Save over $1,000 - battery, charger & portability kit included",
};

const BOOLEAN_FEATURES = [
  { label: "Battery & Charger Included", competitor: false, tbf: true },
  { label: "One-Hand Carry", competitor: false, tbf: true },
  { label: "No Cart Required", competitor: false, tbf: true },
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

// Individual stat card component
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
  const displayValue = stat.displayCompetitor
    ? isAnimating
      ? animatedValue + stat.suffix
      : stat.tbfValue + stat.suffix
    : animatedValue + stat.suffix;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#1A1A1A] p-6 rounded-xl hover:bg-[#1A1A1A]/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00B4D8]/10"
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-[#0077B6]/20 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[#00B4D8]" />
      </div>

      {/* Label */}
      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
        {stat.label}
      </div>

      {/* Comparison */}
      <div className="flex items-center justify-between gap-4 mb-4">
        {/* Competitor */}
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-wider text-red-400 mb-1">
            Others
          </div>
          <div className="text-lg font-bold text-gray-500 line-through opacity-60">
            {stat.competitorValue}
            {stat.competitorSuffix || stat.suffix}
          </div>
        </div>

        {/* Arrow */}
        <div className="text-[#00B4D8] animate-pulse">→</div>

        {/* TBF */}
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-wider text-emerald-400 mb-1">
            TBF
          </div>
          <div
            className={`text-2xl font-black transition-colors duration-300 ${
              isAnimating ? "text-white" : "text-[#00B4D8]"
            }`}
          >
            {displayValue}
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="text-xs text-gray-500 italic">{stat.tagline}</div>
    </motion.div>
  );
}

// Cost card (wider)
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
      className="bg-[#1A1A1A] p-8 rounded-xl md:col-span-2 hover:bg-[#1A1A1A]/80 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left side - icon and label */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#0077B6]/20 rounded-lg flex items-center justify-center">
            <Icon className="w-7 h-7 text-[#00B4D8]" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {COST_COMPARISON.label}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {COST_COMPARISON.tagline}
            </div>
          </div>
        </div>

        {/* Right side - comparison */}
        <div className="flex items-center gap-8">
          {/* Competitor */}
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-red-400 mb-1">
              Others
            </div>
            <div className="text-xl font-bold text-gray-500 line-through opacity-60">
              ${COST_COMPARISON.competitorValue.toLocaleString()}+
            </div>
            <div className="text-[10px] text-gray-600 mt-1">
              {COST_COMPARISON.competitorNote}
            </div>
          </div>

          {/* Arrow */}
          <div className="text-2xl text-[#00B4D8] animate-pulse">→</div>

          {/* TBF */}
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-emerald-400 mb-1">
              TBF
            </div>
            <div
              className={`text-3xl font-black transition-colors duration-300 ${
                isAnimating ? "text-white" : "text-[#00B4D8]"
              }`}
            >
              ${animatedValue.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">
              {COST_COMPARISON.tbfNote}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Boolean features card
function BooleanFeaturesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-[#1A1A1A] p-6 rounded-xl md:col-span-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BOOLEAN_FEATURES.map((feature) => (
          <div key={feature.label} className="text-center">
            <div className="text-sm font-semibold text-white mb-3">
              {feature.label}
            </div>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-red-400">
                <span className="text-xs">Others:</span>
                <X className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="text-xs">TBF:</span>
                <Check className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function CompetitorComparison() {
  return (
    <section className="py-20 bg-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#00B4D8] text-xs font-bold tracking-[3px] uppercase mb-4">
            The Numbers Don&apos;t Lie
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Pros Choose The Bottom Feeder
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See how we stack up against cart-based systems like Riptide
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {COMPARISON_STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Cost Comparison (full width) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CostCard />
        </div>

        {/* Boolean Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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
            className="inline-block bg-[#00B4D8] hover:bg-[#0077B6] text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00B4D8]/30"
          >
            Get The Bottom Feeder - $1,535
          </a>
          <p className="text-gray-500 text-sm mt-4">
            1-Year Limited Warranty • Free Shipping on Orders $500+ • Made in USA
          </p>
        </motion.div>
      </div>
    </section>
  );
}
