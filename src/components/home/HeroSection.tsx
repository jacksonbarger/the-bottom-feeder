"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BUSINESS_INFO } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Main Logo - Big and Centered */}
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
            className="mx-auto mb-8 w-full max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto"
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
          className="text-lg md:text-xl lg:text-2xl text-[#F5F5F5]/90 mb-4 max-w-2xl mx-auto"
        >
          Cordless Pool Cleaning Revolution
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-md md:text-lg text-[#00B4D8] mb-8 max-w-xl mx-auto"
        >
          No hoses. No cords. No hassle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/products/vacuums" className="btn-primary text-lg px-8 py-4">
            Shop Vacuums
          </Link>
          <Link href="/products" className="btn-secondary text-lg px-8 py-4">
            View All Products
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-[#00B4D8] text-sm"
        >
          {BUSINESS_INFO.freeShipping} &bull; 1.5 Hour Battery Life &bull; Only 18 lbs
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
