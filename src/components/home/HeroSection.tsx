"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BUSINESS_INFO } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="video-background"
        poster="/images/logo-light.png"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay - Stronger on mobile for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/80 via-[#1A1A1A]/50 to-[#1A1A1A]/90 sm:from-[#1A1A1A]/70 sm:via-[#1A1A1A]/50 sm:to-[#1A1A1A]/90" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto py-8 sm:py-12">
        {/* Main Logo - Responsive sizing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/bottom-feeder-logo.png"
            alt={BUSINESS_INFO.name}
            width={800}
            height={248}
            className="mx-auto mb-6 sm:mb-8 w-full max-w-[280px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[700px] h-auto"
            style={{
              filter: 'drop-shadow(1px 0 0 white) drop-shadow(-1px 0 0 white) drop-shadow(0 1px 0 white) drop-shadow(0 -1px 0 white) drop-shadow(0 0 8px rgba(255,255,255,0.5))'
            }}
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#F5F5F5]/90 mb-3 sm:mb-4 max-w-2xl mx-auto px-2"
        >
          Cordless Pool Cleaning Revolution
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm sm:text-base md:text-lg text-[#00B4D8] mb-6 sm:mb-8 max-w-xl mx-auto"
        >
          No hoses. No cords. No hassle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
        >
          <Link
            href="/products/vacuums"
            className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
          >
            Shop Vacuums
          </Link>
          <Link
            href="/products"
            className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
          >
            View All Products
          </Link>
        </motion.div>

        {/* Feature badges - Stack on very small screens */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 text-[#00B4D8] text-xs sm:text-sm"
        >
          <span className="px-2">{BUSINESS_INFO.freeShipping}</span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="px-2">1.5 Hour Battery Life</span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="px-2">Only 18 lbs</span>
        </motion.div>
      </div>

      {/* Scroll indicator - Hidden on very small screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#00B4D8] rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-[#00B4D8] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
