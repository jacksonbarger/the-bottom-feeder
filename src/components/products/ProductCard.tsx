"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const displayPrice = product.salePrice || product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.3) }}
      className="group"
    >
      <Link href={`/products/${product.category}/${product.slug}`}>
        <div className="bg-[#2D2D2D] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl active:scale-[0.98] sm:hover:-translate-y-2">
          {/* Product Image */}
          <div className="relative aspect-square bg-[#1A1A1A] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Sale Badge */}
            {hasDiscount && (
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#00B4D8] text-white text-xs font-bold px-2 py-1 rounded">
                SALE
              </div>
            )}

            {/* Quick Add Button - Always visible on mobile, hover on desktop */}
            <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="bg-[#0077B6] hover:bg-[#00B4D8] active:bg-[#005f91] text-white p-2.5 sm:p-3 rounded-full transition-colors duration-300 touch-target"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Add to cart functionality
                }}
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-3 sm:p-4 flex flex-col min-h-[120px] sm:min-h-[140px]">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-[#00B4D8] transition-colors">
              {product.name}
            </h3>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#00B4D8] font-bold text-lg sm:text-xl">
                ${displayPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-gray-500 line-through text-xs sm:text-sm">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="mt-auto pt-1.5 sm:pt-2 flex items-center justify-between">
              {product.variants && product.variants.length > 0 && (
                <p className="text-gray-400 text-xs sm:text-sm">
                  {product.variants.length} sizes
                </p>
              )}

              {product.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-gray-400 text-xs sm:text-sm">{product.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
