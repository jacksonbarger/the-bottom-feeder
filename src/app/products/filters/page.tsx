import { Metadata } from "next";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryNav from "@/components/products/CategoryNav";
import { getProductsByCategory, CATEGORY_INFO } from "@/lib/products";

export const metadata: Metadata = {
  title: "Debris Bags & Filters",
  description: "Shop Bottom Feeder debris bags and filter systems for optimal pool cleaning performance.",
};

export default function FiltersPage() {
  const products = getProductsByCategory("filters");
  const categoryInfo = CATEGORY_INFO.filters;

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Hero Section */}
      <div className="bg-[#2D2D2D] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {categoryInfo.name}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            {categoryInfo.description}
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryNav />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
