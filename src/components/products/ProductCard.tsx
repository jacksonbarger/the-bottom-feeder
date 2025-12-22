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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/products/${product.category}/${product.slug}`}>
        <div className="bg-[#2D2D2D] rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
          {/* Product Image */}
          <div className="relative aspect-square bg-[#1A1A1A] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Sale Badge */}
            {hasDiscount && (
              <div className="absolute top-3 left-3 bg-[#00B4D8] text-white text-xs font-bold px-2 py-1 rounded">
                SALE
              </div>
            )}

            {/* Quick Add Button */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="bg-[#0077B6] hover:bg-[#00B4D8] text-white p-3 rounded-full transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Add to cart functionality
                }}
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 flex flex-col h-[140px]">
            <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-[#00B4D8] transition-colors min-h-[56px]">
              {product.name}
            </h3>

            <div className="flex items-center gap-2">
              <span className="text-[#00B4D8] font-bold text-xl">
                ${displayPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-gray-500 line-through text-sm">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="mt-auto pt-2">
              {product.variants && product.variants.length > 0 && (
                <p className="text-gray-400 text-sm">
                  {product.variants.length} sizes available
                </p>
              )}

              {product.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-gray-400 text-sm">{product.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
