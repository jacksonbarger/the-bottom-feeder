import { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with The Bottom Feeder. Questions about our cordless pool vacuums? We're here to help.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#2D2D2D] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-[#F5F5F5]/70 text-lg max-w-2xl mx-auto">
            Have questions about our products? Need help with an order?
            We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Phone */}
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, "")}`}
              className="bg-[#2D2D2D] rounded-lg p-8 text-center hover:bg-[#353535] transition-colors group"
            >
              <div className="w-16 h-16 bg-[#0077B6] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00B4D8] transition-colors">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
              <p className="text-[#00B4D8] font-medium">{BUSINESS_INFO.phone}</p>
              <p className="text-[#F5F5F5]/60 text-sm mt-2">
                Fastest way to reach us
              </p>
            </a>

            {/* Text */}
            <a
              href={`sms:${BUSINESS_INFO.phone.replace(/[^0-9]/g, "")}`}
              className="bg-[#2D2D2D] rounded-lg p-8 text-center hover:bg-[#353535] transition-colors group"
            >
              <div className="w-16 h-16 bg-[#0077B6] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00B4D8] transition-colors">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Text Us</h3>
              <p className="text-[#00B4D8] font-medium">{BUSINESS_INFO.phone}</p>
              <p className="text-[#F5F5F5]/60 text-sm mt-2">
                Send us a quick message
              </p>
            </a>

            {/* Email */}
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="bg-[#2D2D2D] rounded-lg p-8 text-center hover:bg-[#353535] transition-colors group"
            >
              <div className="w-16 h-16 bg-[#0077B6] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00B4D8] transition-colors">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
              <p className="text-[#00B4D8] font-medium text-sm break-all">{BUSINESS_INFO.email}</p>
              <p className="text-[#F5F5F5]/60 text-sm mt-2">
                For detailed inquiries
              </p>
            </a>
          </div>

          {/* Social Media */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Follow Us</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#2D2D2D] rounded-lg px-6 py-4 hover:bg-[#353535] transition-colors"
              >
                <Facebook className="w-6 h-6 text-[#00B4D8]" />
                <span className="text-white">Facebook</span>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#2D2D2D] rounded-lg px-6 py-4 hover:bg-[#353535] transition-colors"
              >
                <Instagram className="w-6 h-6 text-[#00B4D8]" />
                <span className="text-white">Instagram</span>
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#2D2D2D] rounded-lg px-6 py-4 hover:bg-[#353535] transition-colors"
              >
                <Youtube className="w-6 h-6 text-[#00B4D8]" />
                <span className="text-white">YouTube</span>
              </a>
            </div>
          </div>

          {/* Location Info */}
          <div className="mt-12 bg-[#2D2D2D] rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-[#00B4D8] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Our Location
                  </h3>
                  <p className="text-[#F5F5F5]/80">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-[#00B4D8] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Business Hours
                  </h3>
                  <p className="text-[#F5F5F5]/80">
                    {BUSINESS_INFO.hours}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-[#3D3D3D]">
              <p className="text-[#00B4D8] font-medium text-center">
                {BUSINESS_INFO.freeShipping}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0077B6] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Shop?
          </h2>
          <p className="text-white/90 mb-8">
            Browse our selection of cordless pool vacuums and accessories.
          </p>
          <Link
            href="/products"
            className="bg-white text-[#0077B6] hover:bg-[#F5F5F5] px-8 py-4 rounded font-semibold transition-colors inline-block"
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
