"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import { Waves, Battery, Filter, Wrench } from "lucide-react";

const iconMap = {
  Waves: Waves,
  Battery: Battery,
  Filter: Filter,
  Wrench: Wrench,
};

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-6 sm:mb-8 -mx-4 sm:mx-0 px-4 sm:px-0">
      {/* Horizontal scroll on mobile, wrap on larger screens */}
      <div className="flex gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible sm:flex-wrap pb-2 sm:pb-0 scrollbar-hide">
        <Link
          href="/products"
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm sm:text-base touch-target ${
            pathname === "/products"
              ? "bg-[#0077B6] text-white"
              : "bg-[#2D2D2D] text-gray-300 hover:bg-[#0077B6]/20 hover:text-white active:bg-[#0077B6]/30"
          }`}
        >
          All Products
        </Link>

        {CATEGORIES.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap];
          const href = `/products/${category.slug}`;
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={category.slug}
              href={href}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap text-sm sm:text-base touch-target ${
                isActive
                  ? "bg-[#0077B6] text-white"
                  : "bg-[#2D2D2D] text-gray-300 hover:bg-[#0077B6]/20 hover:text-white active:bg-[#0077B6]/30"
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {category.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
