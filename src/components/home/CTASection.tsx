"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Check } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";

export default function CTASection() {
  return (
    <section className="py-20 bg-[#0077B6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Pool Cleaning?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of pool owners who have discovered the freedom of cordless pool cleaning.
              The Bottom Feeder makes pool maintenance effortless.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "No hoses or cords to manage",
                "1.5 hours of battery-powered cleaning",
                "Only 18 lbs - easy to use",
                "Works in as little as 3\" of water",
                "Free shipping on orders over $500",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <Check className="w-5 h-5 text-[#00B4D8]" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products/vacuums"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0077B6] px-6 py-3 rounded font-semibold hover:bg-[#F5F5F5] transition-colors"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, "")}`}
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Us
              </a>
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
          >
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  18
                </div>
                <div className="text-white/80">Pounds</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  1.5
                </div>
                <div className="text-white/80">Hour Runtime</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  3&quot;
                </div>
                <div className="text-white/80">Min Water Depth</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  4.9
                </div>
                <div className="text-white/80">Star Rating</div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20 text-center">
              <p className="text-white/90 mb-2">Questions? We&apos;re here to help.</p>
              <p className="text-2xl font-bold text-white">{BUSINESS_INFO.phone}</p>
              <p className="text-white/70 text-sm mt-1">{BUSINESS_INFO.hours}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
