import HeroSection from "@/components/home/HeroSection";
import Product360Section from "@/components/home/Product360Section";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Product360Section />
      <FeaturedProducts />
      <FeaturesSection />
      <CTASection />
    </>
  );
}
