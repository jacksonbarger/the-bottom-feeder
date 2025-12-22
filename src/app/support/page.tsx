"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, Mail, FileText, HelpCircle } from "lucide-react";
import Link from "next/link";
import { FAQ_ITEMS, BUSINESS_INFO } from "@/lib/constants";

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Hero Section */}
      <div className="bg-[#2D2D2D] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Support Center
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Find answers to common questions, access resources, or get in touch with our team.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content - FAQ */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-[#00B4D8]" />
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {FAQ_ITEMS.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-[#2D2D2D] rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-[#3D3D3D] transition-colors"
                    >
                      <span className="text-white font-medium pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#00B4D8] flex-shrink-0 transition-transform ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 text-gray-400">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Resources Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#00B4D8]" />
                Resources
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#2D2D2D] p-6 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">User Manual</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Download the complete user guide for your Bottom Feeder vacuum.
                  </p>
                  <button className="text-[#00B4D8] hover:text-white transition-colors text-sm font-medium">
                    Download PDF →
                  </button>
                </div>

                <div className="bg-[#2D2D2D] p-6 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Warranty Information</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Learn about our warranty coverage and how to file a claim.
                  </p>
                  <button className="text-[#00B4D8] hover:text-white transition-colors text-sm font-medium">
                    View Details →
                  </button>
                </div>

                <div className="bg-[#2D2D2D] p-6 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Parts Diagram</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Identify parts for your vacuum with our interactive diagram.
                  </p>
                  <button className="text-[#00B4D8] hover:text-white transition-colors text-sm font-medium">
                    View Diagram →
                  </button>
                </div>

                <div className="bg-[#2D2D2D] p-6 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Video Tutorials</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Watch how-to videos for setup, maintenance, and troubleshooting.
                  </p>
                  <button className="text-[#00B4D8] hover:text-white transition-colors text-sm font-medium">
                    Watch Videos →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#2D2D2D] rounded-lg p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold text-white mb-6">
                Need More Help?
              </h2>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-[#00B4D8]" />
                    <span className="text-white font-medium">Call Us</span>
                  </div>
                  <a
                    href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, "")}`}
                    className="text-[#00B4D8] hover:text-white transition-colors text-lg font-semibold"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <p className="text-gray-400 text-sm mt-1">{BUSINESS_INFO.hours}</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-[#00B4D8]" />
                    <span className="text-white font-medium">Email Us</span>
                  </div>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-[#00B4D8] hover:text-white transition-colors"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                  <p className="text-gray-400 text-sm mt-1">Response within 24 hours</p>
                </div>

                <div className="pt-6 border-t border-[#3D3D3D]">
                  <Link
                    href="/contact"
                    className="block w-full bg-[#0077B6] hover:bg-[#00B4D8] text-white py-3 rounded-lg font-semibold text-center transition-colors"
                  >
                    Contact Form
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
