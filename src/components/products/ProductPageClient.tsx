"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ShoppingCart, Truck, Shield, Clock } from "lucide-react";
import { type Product } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";
import { useCart } from "@/components/cart/CartContext";
import { fetchProductByHandle } from "@/lib/shopify";

interface ProductPageClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductPageClient({ product, relatedProducts }: ProductPageClientProps) {
  const { addToCart, isLoading } = useCart();
  const [shopifyVariantId, setShopifyVariantId] = useState<string | null>(null);
  const [shopifyError, setShopifyError] = useState<string | null>(null);

  const displayPrice = product.salePrice || product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;

  // Fetch real Shopify variant ID on mount
  useEffect(() => {
    async function fetchShopifyProduct() {
      try {
        const shopifyProduct = await fetchProductByHandle(product.shopifyHandle);
        // The API returns variants as an array after transformation in shopify.ts
        const variants = shopifyProduct?.variants as unknown as Array<{ id: string }>;
        if (variants && variants.length > 0) {
          setShopifyVariantId(variants[0].id);
        } else {
          setShopifyError("Product not available for purchase");
        }
      } catch {
        setShopifyError("Unable to connect to store");
      }
    }
    fetchShopifyProduct();
  }, [product.shopifyHandle]);

  const handleAddToCart = async () => {
    if (!shopifyVariantId) {
      return;
    }
    await addToCart(shopifyVariantId, 1);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Breadcrumb - Sticky on mobile for easy navigation */}
      <div className="bg-[#2D2D2D] py-3 sm:py-4 sticky top-16 sm:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/products/${product.category}`}
            className="inline-flex items-center gap-2 text-[#00B4D8] hover:text-white transition-colors py-1 touch-target"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm sm:text-base">Back to {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-square bg-[#2D2D2D] rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {hasDiscount && (
              <span className="inline-block bg-[#00B4D8] text-white text-sm font-bold px-3 py-1 rounded mb-4">
                SALE
              </span>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-[#00B4D8]">
                ${displayPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {product.rating && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="text-white font-medium">{product.rating}</span>
                <span className="text-gray-400">rating</span>
              </div>
            )}

            <p className="text-gray-300 text-lg mb-8">{product.description}</p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <h3 className="text-white font-semibold mb-3">Size Options</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.name}
                      className="px-4 py-2 bg-[#2D2D2D] text-white rounded hover:bg-[#0077B6] transition-colors"
                    >
                      {variant.name} - ${variant.price.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isLoading || !shopifyVariantId}
              className="w-full bg-[#0077B6] hover:bg-[#00B4D8] text-white py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              <ShoppingCart className="w-6 h-6" />
              {isLoading ? "Adding..." : shopifyVariantId ? "Add to Cart" : "Loading..."}
            </button>
            {shopifyError && (
              <p className="text-yellow-500 text-sm text-center mb-8">
                {shopifyError} - Please contact us to order.
              </p>
            )}

            {/* Features */}
            {product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-white font-semibold mb-4">Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-[#00B4D8] flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#2D2D2D]">
              <div className="text-center">
                <Truck className="w-8 h-8 text-[#00B4D8] mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Free Shipping $500+</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-[#00B4D8] mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Warranty Included</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-[#00B4D8] mx-auto mb-2" />
                <p className="text-gray-400 text-sm">1-5 Day Processing</p>
              </div>
            </div>

            {/* SKU */}
            <p className="text-gray-500 text-sm mt-6">SKU: {product.sku}</p>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
