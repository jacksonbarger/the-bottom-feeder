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
    <nav className="mb-8">
      <div className="flex flex-wrap gap-3">
        <Link
          href="/products"
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            pathname === "/products"
              ? "bg-[#0077B6] text-white"
              : "bg-[#2D2D2D] text-gray-300 hover:bg-[#0077B6]/20 hover:text-white"
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
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                isActive
                  ? "bg-[#0077B6] text-white"
                  : "bg-[#2D2D2D] text-gray-300 hover:bg-[#0077B6]/20 hover:text-white"
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
