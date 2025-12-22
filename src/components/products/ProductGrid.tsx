"use client";

import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
}

export default function ProductGrid({ products, title, description }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div>
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
          )}
          {description && (
            <p className="text-gray-400 text-lg max-w-2xl">{description}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}
