import Header from "@/components/layout/header";
import Hero from "@/components/sections/hero";
import DataMethodology from "@/components/sections/data-methodology";
import ProblemStatement from "@/components/sections/problem-statement";
import SolutionOverview from "@/components/sections/solution-overview";
import ProductShowcase from "@/components/sections/product-showcase";
import InteractiveTools from "@/components/sections/interactive-tools";
import CaseStudies from "@/components/sections/case-studies";
import Pricing from "@/components/sections/pricing";
import Contact from "@/components/sections/contact";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <DataMethodology />
        <ProblemStatement />
        <SolutionOverview />
        <ProductShowcase />
        <InteractiveTools />
        <CaseStudies />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
