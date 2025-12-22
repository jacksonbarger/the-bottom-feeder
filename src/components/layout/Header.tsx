"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ShoppingCart } from "lucide-react";
import { NAV_LINKS, BUSINESS_INFO } from "@/lib/constants";
import { useCart } from "@/components/cart/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsOpen: setCartOpen, itemCount } = useCart();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-[#0077B6]/20 safe-area-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/images/logo-light.png"
              alt={BUSINESS_INFO.name}
              width={40}
              height={40}
              className="rounded-full w-10 h-10 sm:w-[50px] sm:h-[50px]"
            />
            <span className="text-lg sm:text-xl font-bold text-white hidden xs:block">
              The Bottom Feeder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#F5F5F5] hover:text-[#00B4D8] transition-colors font-medium py-2"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart Button - Touch friendly size */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-3 text-[#00B4D8] hover:text-white transition-colors touch-target"
              aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#0077B6] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            {/* Phone - Mobile only */}
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, "")}`}
              className="lg:hidden p-3 text-[#00B4D8] hover:text-white transition-colors touch-target"
              aria-label="Call us"
            >
              <Phone size={24} />
            </a>

            {/* Shop Now - Desktop only */}
            <Link
              href="/products"
              className="hidden lg:inline-flex btn-primary"
            >
              Shop Now
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-white touch-target"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation with Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 lg:hidden"
              style={{ top: "64px" }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-[#1A1A1A] border-t border-[#0077B6]/20 overflow-hidden"
            >
              <nav className="px-4 py-6 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-[#F5F5F5] hover:text-[#00B4D8] hover:bg-[#2D2D2D] transition-colors font-medium py-4 px-4 rounded-lg text-lg"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05 }}
                  className="pt-4"
                >
                  <Link
                    href="/products"
                    onClick={() => setIsMenuOpen(false)}
                    className="block btn-primary text-center text-lg py-4"
                  >
                    Shop Now
                  </Link>
                </motion.div>

                {/* Contact info in mobile menu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (NAV_LINKS.length + 1) * 0.05 }}
                  className="pt-6 border-t border-[#2D2D2D] mt-4"
                >
                  <a
                    href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, "")}`}
                    className="flex items-center gap-3 text-[#00B4D8] py-3 px-4"
                  >
                    <Phone size={20} />
                    <span className="font-medium">{BUSINESS_INFO.phone}</span>
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
