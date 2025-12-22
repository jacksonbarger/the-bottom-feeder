"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Dynamically import the 3D viewer to avoid SSR issues with Three.js
const Product3DViewer = dynamic(() => import("./Product3DViewer"), {
  ssr: false,
  loading: () => (
    <div className="aspect-square bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] rounded-2xl flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#0077B6] border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-400 text-sm">Loading 3D View...</span>
      </div>
    </div>
  ),
});

export default function Product360Section() {
  return (
    <section className="py-20 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <Product3DViewer
              className="w-full max-w-lg mx-auto lg:max-w-none"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Experience the
              <span className="text-[#00B4D8] block">Innovation</span>
            </h2>

            <p className="text-gray-300 text-lg mb-6 max-w-md mx-auto lg:mx-0">
              The Bottom Feeder is engineered for effortless pool cleaning.
              Explore every angle of our revolutionary cordless vacuum.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto lg:mx-0">
              <div className="bg-[#2D2D2D] rounded-lg p-4 text-center">
                <span className="text-[#00B4D8] text-2xl font-bold">18</span>
                <span className="text-gray-400 text-sm block">Pounds</span>
              </div>
              <div className="bg-[#2D2D2D] rounded-lg p-4 text-center">
                <span className="text-[#00B4D8] text-2xl font-bold">1.5</span>
                <span className="text-gray-400 text-sm block">Hour Runtime</span>
              </div>
              <div className="bg-[#2D2D2D] rounded-lg p-4 text-center">
                <span className="text-[#00B4D8] text-2xl font-bold">3&quot;</span>
                <span className="text-gray-400 text-sm block">Min. Depth</span>
              </div>
              <div className="bg-[#2D2D2D] rounded-lg p-4 text-center">
                <span className="text-[#00B4D8] text-2xl font-bold">4.9</span>
                <span className="text-gray-400 text-sm block">Star Rating</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/products/vacuums/the-bottom-feeder"
              className="inline-flex items-center gap-2 bg-[#0077B6] hover:bg-[#00B4D8] text-white px-8 py-4 rounded-lg font-semibold transition-colors group"
            >
              View Product Details
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
