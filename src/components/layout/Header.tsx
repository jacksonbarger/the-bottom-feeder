"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, ShoppingCart } from "lucide-react";
import { NAV_LINKS, BUSINESS_INFO } from "@/lib/constants";
import { useCart } from "@/components/cart/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsOpen: setCartOpen, itemCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-[#0077B6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo-light.png"
              alt={BUSINESS_INFO.name}
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-white hidden sm:block">
              The Bottom Feeder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#F5F5F5] hover:text-[#00B4D8] transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-[#00B4D8] hover:text-white transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0077B6] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>

            <Link
              href="/products"
              className="hidden sm:inline-flex btn-primary"
            >
              Shop Now
            </Link>

            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, "")}`}
              className="md:hidden p-2 text-[#00B4D8]"
              aria-label="Call us"
            >
              <Phone size={24} />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A] border-t border-[#0077B6]/20">
          <nav className="px-4 py-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-[#F5F5F5] hover:text-[#00B4D8] transition-colors font-medium py-2"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/products"
              onClick={() => setIsMenuOpen(false)}
              className="block btn-primary text-center mt-4"
            >
              Shop Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
