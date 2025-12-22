import { Metadata } from "next";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryNav from "@/components/products/CategoryNav";
import { getProductsByCategory, CATEGORY_INFO } from "@/lib/products";

export const metadata: Metadata = {
  title: "Batteries & Power",
  description: "Shop Bottom Feeder battery packs, chargers, and power accessories for extended pool cleaning.",
};

export default function BatteriesPage() {
  const products = getProductsByCategory("batteries");
  const categoryInfo = CATEGORY_INFO.batteries;

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Hero Section */}
      <div className="bg-[#2D2D2D] py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
            {categoryInfo.name}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl">
            {categoryInfo.description}
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <CategoryNav />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
