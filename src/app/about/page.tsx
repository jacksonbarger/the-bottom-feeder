"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Award, Zap, Feather, MapPin, Shield } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#2D2D2D] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                About {BUSINESS_INFO.name}
              </h1>
              <p className="text-[#00B4D8] text-xl mb-6">
                Revolutionizing Pool Cleaning
              </p>
              <p className="text-[#F5F5F5]/70 text-lg">
                The Bottom Feeder was born from a simple idea: pool cleaning shouldn&apos;t be complicated.
                Our cordless, battery-powered pool vacuums eliminate the hassle of hoses, cords, and
                bulky equipment. Just grab and go.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <Image
                src="/images/logo-light.png"
                alt={BUSINESS_INFO.name}
                width={300}
                height={300}
                className="rounded-full shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Mission
            </h2>
            <p className="text-[#F5F5F5]/70 max-w-3xl mx-auto text-lg">
              To make pool maintenance effortless for every pool owner. We design and manufacture
              innovative cordless pool cleaning solutions that combine power, portability, and
              ease of use.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Innovation",
                description: "Pushing the boundaries of cordless pool cleaning technology.",
              },
              {
                icon: Award,
                title: "Quality",
                description: "Premium materials and construction for lasting performance.",
              },
              {
                icon: Feather,
                title: "Simplicity",
                description: "No hoses, no cords, no complicated setup - just clean pools.",
              },
              {
                icon: Shield,
                title: "Support",
                description: "Dedicated customer service and comprehensive warranty coverage.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#2D2D2D] rounded-lg p-6 text-center"
              >
                <div className="w-14 h-14 bg-[#0077B6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-[#F5F5F5]/70 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Story */}
      <section className="py-20 bg-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
          >
            The Bottom Feeder Difference
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#0077B6] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Truly Cordless
                  </h3>
                  <p className="text-[#F5F5F5]/70">
                    No hoses dragging across your pool deck. No extension cords to manage.
                    Just pick up The Bottom Feeder and start cleaning.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#0077B6] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Incredibly Light
                  </h3>
                  <p className="text-[#F5F5F5]/70">
                    At only 18 pounds, anyone can easily use and maneuver our vacuum.
                    No heavy lifting or straining required.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#0077B6] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Extended Runtime
                  </h3>
                  <p className="text-[#F5F5F5]/70">
                    Our LiFePO4 battery provides up to 1.5 hours of continuous cleaning
                    per charge - enough for most residential pools.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#1A1A1A] rounded-lg p-8"
            >
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#00B4D8]" />
                Based in Las Vegas
              </h3>
              <p className="text-[#F5F5F5]/80 mb-4">
                Our headquarters are located in <strong>Las Vegas, Nevada</strong>.
                We ship nationwide with free shipping on orders over $500.
              </p>
              <div className="space-y-2 text-[#F5F5F5]/70">
                <p><strong className="text-white">Address:</strong> {BUSINESS_INFO.address}</p>
                <p><strong className="text-white">Hours:</strong> {BUSINESS_INFO.hours}</p>
                <p><strong className="text-white">Phone:</strong> {BUSINESS_INFO.phone}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0077B6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Ready to Experience Effortless Pool Cleaning?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/90 mb-8"
          >
            Join thousands of pool owners who have upgraded to The Bottom Feeder.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/products/vacuums"
              className="bg-white text-[#0077B6] hover:bg-[#F5F5F5] px-8 py-4 rounded font-semibold transition-colors"
            >
              Shop Vacuums
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-[#0077B6] px-8 py-4 rounded font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
