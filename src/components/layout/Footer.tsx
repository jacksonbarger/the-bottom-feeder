import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { BUSINESS_INFO, NAV_LINKS, CATEGORIES, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] border-t border-[#0077B6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo-light.png"
                alt={BUSINESS_INFO.name}
                width={60}
                height={60}
                className="rounded-full"
              />
            </Link>
            <p className="text-[#F5F5F5]/70 text-sm">
              {BUSINESS_INFO.tagline}
            </p>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F5F5]/70 hover:text-[#00B4D8] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F5F5]/70 hover:text-[#00B4D8] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F5F5]/70 hover:text-[#00B4D8] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#F5F5F5]/70 hover:text-[#00B4D8] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/products/${category.slug}`}
                    className="text-[#F5F5F5]/70 hover:text-[#00B4D8] transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, "")}`}
                  className="flex items-center gap-2 text-[#F5F5F5]/70 hover:text-[#00B4D8] transition-colors text-sm"
                >
                  <Phone size={16} />
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-2 text-[#F5F5F5]/70 hover:text-[#00B4D8] transition-colors text-sm"
                >
                  <Mail size={16} />
                  {BUSINESS_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#F5F5F5]/70 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>{BUSINESS_INFO.address}</span>
              </li>
              <li className="flex items-start gap-2 text-[#F5F5F5]/70 text-sm">
                <Clock size={16} className="mt-0.5 flex-shrink-0" />
                <span>{BUSINESS_INFO.hours}</span>
              </li>
            </ul>
            <p className="mt-4 text-[#00B4D8] text-sm font-medium">
              {BUSINESS_INFO.freeShipping}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#0077B6]/20 mt-8 pt-8 text-center">
          <p className="text-[#F5F5F5]/50 text-sm">
            &copy; {currentYear} {BUSINESS_INFO.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
