import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getProductsByCategory, PRODUCTS } from "@/lib/products";
import ProductPageClient from "@/components/products/ProductPageClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all parts products
export async function generateStaticParams() {
  const partsProducts = PRODUCTS.filter(p => p.category === 'parts');
  return partsProducts.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | The Bottom Feeder',
    };
  }

  return {
    title: `${product.name} | The Bottom Feeder`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return <ProductPageClient product={product} relatedProducts={relatedProducts} />;
}
