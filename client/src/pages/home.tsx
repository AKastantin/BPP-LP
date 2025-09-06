import Header from "@/components/layout/header";
import Hero from "@/components/sections/hero";
import DataMethodology from "@/components/sections/data-methodology";
import SolutionOverview from "@/components/sections/solution-overview";
import ProductShowcase from "@/components/sections/product-showcase";
import InteractiveTools from "@/components/sections/interactive-tools";
import Contact from "@/components/sections/contact";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <DataMethodology />
        <SolutionOverview />
        <ProductShowcase />
        <InteractiveTools />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
