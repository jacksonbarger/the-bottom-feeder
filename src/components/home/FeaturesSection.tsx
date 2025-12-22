"use client";

import { motion } from "framer-motion";
import { Zap, Clock, Feather, Droplets, Settings, Truck } from "lucide-react";
import { KEY_FEATURES } from "@/lib/constants";

const iconMap = {
  Zap: Zap,
  Clock: Clock,
  Feather: Feather,
  Droplets: Droplets,
  Settings: Settings,
  Truck: Truck,
};

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose The Bottom Feeder?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Revolutionary cordless pool cleaning technology that makes maintenance effortless
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {KEY_FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1A1A1A] p-6 rounded-lg hover:bg-[#1A1A1A]/80 transition-colors"
              >
                <div className="w-12 h-12 bg-[#0077B6]/20 rounded-lg flex items-center justify-center mb-4">
                  {Icon && <Icon className="w-6 h-6 text-[#00B4D8]" />}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
