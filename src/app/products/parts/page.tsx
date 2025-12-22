import { Metadata } from "next";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryNav from "@/components/products/CategoryNav";
import { getProductsByCategory, CATEGORY_INFO } from "@/lib/products";

export const metadata: Metadata = {
  title: "Replacement Parts",
  description: "Shop Bottom Feeder replacement parts and accessories to keep your vacuum running like new.",
};

export default function PartsPage() {
  const products = getProductsByCategory("parts");
  const categoryInfo = CATEGORY_INFO.parts;

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
